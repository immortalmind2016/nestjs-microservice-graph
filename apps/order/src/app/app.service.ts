import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDto } from '../dto/order.dto';
import { RequestUserDto } from '@avafive-task/request';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@InjectRepository(Order) private orderRepo:Repository<Order>,@Inject("KAFKA_SERVICE_CLIENT") private readonly  kafkaClient:ClientProxy) {}

  async create(order:OrderDto,user:RequestUserDto){
    const result=await this.orderRepo.insert({...order,userId:user.id})
    const createdOrder=await this.orderRepo.findOne({where:{id:result.raw[0].id}})
    console.log(this.kafkaClient.emit("order_created",JSON.stringify(createdOrder)))
    return createdOrder
  }


   findById(id:number){
    return this.orderRepo.findOne({where:{id}})
  }
   updateById(id:number,order:Partial<OrderDto>){
    return this.orderRepo.update({id},order)
  }

  list(filter){
    return this.orderRepo.find(filter)
  }




}

import { Args, ID, Mutation ,Resolver,Query, PartialType} from '@nestjs/graphql';
import { AppService } from './app.service';
import { OrderDto, OrderFilterDto } from '../dto/order.dto';
import { Order } from '../entities/order.entity';
import { RequestUser, RequestUserDto } from '@avafive-task/request';

@Resolver(()=>Order)
export class AppResolver {
  constructor(private readonly appService: AppService) {}


  @Mutation(() => Order)
  async createOrder(@Args("payload") order:OrderDto,@RequestUser() requestUser:RequestUserDto) {
    return this.appService.create(order,requestUser)
  }

  @Query(()=>[Order])
  listOrders(@Args("filter") filter:OrderFilterDto){
    return this.appService.list({where:filter})
  }

  @Query(()=>Order)
  order(@Args("id") id:number){
    return this.appService.findById(id)
  }




}

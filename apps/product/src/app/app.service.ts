import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDto } from '../dto/product.dto';

@Injectable()
export class AppService {
  constructor(@InjectRepository(Product) private productRepo:Repository<Product>) {}

  async create(product:ProductDto){
    const result=await this.productRepo.insert(product)
    return {...product,id:result.raw[0].id}
  }


   findById(id:number){
    return this.productRepo.findOne({where:{id}})
  }
   updateById(id:number,product:ProductDto){
    return this.productRepo.update({id},product)
  }

  list(filter={}){
    return this.productRepo.find(filter)
  }

  save(product:DeepPartial<Product>){
    return this.productRepo.save(product)
  }




}

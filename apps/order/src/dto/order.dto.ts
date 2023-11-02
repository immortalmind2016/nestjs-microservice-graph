import { Field, ID, InputType, PickType } from "@nestjs/graphql"
import { OrderStatus } from "../types"
import { Product } from "../entities/product.entity";

@InputType()
class ProductQuantityDto{
  @Field()
  quantity:number

  @Field()
  id:number
}

@InputType()
export class OrderFilterDto{

  @Field(()=>OrderStatus,{nullable:true})
  status?:OrderStatus

}

@InputType()
export class OrderDto{

  @Field(()=>[ProductQuantityDto])
  productQuantity:ProductQuantityDto[]

  status?:OrderStatus;
  totalPrice?:number;
  products?:Product[];

}



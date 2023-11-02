import { Field, InputType, PickType } from "@nestjs/graphql"

@InputType()
export class ProductDto{
  @Field()
  title:string

  @Field()
  price:number

  @Field()
  quantity:number

}



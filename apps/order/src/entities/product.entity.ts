
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';




@ObjectType()
@Directive('@key(fields: "id")')
export class Product {
  @Field(() => ID)
  id: number;

  title:string;
  price:string;
}

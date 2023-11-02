
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { Order } from './order.entity';




@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: number;

  @Field(()=>[Order])
  orders:Order[]
}

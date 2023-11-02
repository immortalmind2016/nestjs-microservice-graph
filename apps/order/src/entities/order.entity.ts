
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';
import { OrderStatus } from '../types';


@ObjectType()
class ProductQuantity{
  @Field()
  quantity:number

  @Field()
  id:number
}

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')

export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name:"user_id"})
  userId:number

  @Field()
  user:User

  @Field(()=>[Product])
  @Column({type:"jsonb",default:[]})
  products:Product[]

  @Column({type:"jsonb",default:[]})
  @Field(()=>[ProductQuantity])
  productQuantity:ProductQuantity[]

  // snapshot of the product price at the time of purchase
  @Column({name:"total_price",nullable:true})
  @Field({nullable:true})
  totalPrice:number


  @Column({type:"enum",enum:OrderStatus,default:OrderStatus.PENDING})
  @Field(()=>OrderStatus)
  status:OrderStatus

}

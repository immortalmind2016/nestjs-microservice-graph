
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')

export class Product {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  title:string

  @Column()
  @Field()
  price:number

  @Column({default:0})
  @Field()
  quantity:number

}

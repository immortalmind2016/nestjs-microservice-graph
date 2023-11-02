
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')

export class User {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  name:string

  @Column()
  @Field()
  email:string

  @Column()
  @Field()
  password:string

}

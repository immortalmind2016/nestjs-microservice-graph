import { Field, InputType, PickType } from "@nestjs/graphql"

@InputType()
export class UserDto{
  @Field()
  name:string

  @Field()
  email:string

  @Field()
  password:string
}

@InputType()
export class UserLoginDto extends PickType(UserDto,["email","password"]){}

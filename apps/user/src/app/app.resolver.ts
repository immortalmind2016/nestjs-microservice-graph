import { Args, ID, Mutation, Query ,Resolver} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UserDto, UserLoginDto } from '../dto/user.dto';
import { AppService } from './app.service';
import {RequestUser, RequestUserDto} from "@avafive-task/request"

// @MessagePattern("create_user")
// async createUser(user:UserDto){
//   console.log("HHHHHHH")
//   return this.appService.create(user)
// }

// @Get("/:id")
// async getUser(id:number){
//   return this.appService.findById(id)
// }

// @Put("/:id")
// async updateUser(id:number,user:UserDto){
//   return this.appService.updateById(id,user)
// }

// @MessagePattern("login")
// login(input: any) {
//   console.log("🚀 ~ file: app.controller.ts:33 ~ AppController ~ login ~ input:", input)
//   return this.appService.login(input.email,input.password)
// }

@Resolver(()=>User)
export class AppResolver {
  constructor(private readonly appService: AppService) {}


  @Mutation(() => ID)
  async createUser(@Args("payload") user:UserDto) {
    const createdUser=await this.appService.create(user)
    return createdUser.id
  }

  @Mutation(()=>String)
  login(@Args("payload") {email,password}:UserLoginDto){
    return this.appService.login(email,password)
  }

  @Query(()=>User)
  me(@RequestUser() requestUser:RequestUserDto){
    return this.appService.findById(requestUser.id)
  }

}

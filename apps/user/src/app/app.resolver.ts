import { Args, ID, Mutation, Query ,Resolver} from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { UserDto, UserLoginDto } from '../dto/user.dto';
import { AppService } from './app.service';
import {RequestUser, RequestUserDto} from "@avafive-task/request"

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


  @Mutation(()=>User)
  updateUser(@RequestUser() requestUser:RequestUserDto,@Args("payload") user:UserDto){
    return this.appService.updateById(requestUser.id,user)
  }

}

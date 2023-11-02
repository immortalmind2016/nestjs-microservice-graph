import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { Order } from "../entities/order.entity";
import { AppService } from "./app.service";


@Resolver(()=>User)
export class UserResolver{

  constructor(private readonly appService:AppService){}

  @ResolveField(()=>[Order])
  async orders(@Parent() order:Order){
    return this.appService.list({where:{userId:order.userId}})
  }
}

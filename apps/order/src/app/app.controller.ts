import { Controller, Injectable } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { OrderStatus } from "../types";

@Controller()
export class AppController{
  constructor(private readonly appService: AppService) {}

  @EventPattern('order_products_fulfilled')
  async handleOrderProductsFulfilled(data:any){
    this.appService.updateById(data.orderId,{status:OrderStatus.COMPLETED,totalPrice:data.products.reduce((acc:any,curr:any)=>acc+curr.price,0),products:data.products})

  }
  @EventPattern('order_products_quantity_error')
  async orderProductsQuantityError(data:any){
    this.appService.updateById(data.orderId,{status:OrderStatus.FAILED_QUANTITY})

  }


}

import { Controller, Inject } from "@nestjs/common";
import { ClientProxy, EventPattern } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { In } from "typeorm";

@Controller()
export class AppController{
  constructor(@Inject("KAFKA_SERVICE_CLIENT") private kafkaClient:ClientProxy,private readonly appService: AppService){}

  @EventPattern("order_created")
  async handleProductCreated(data:any){
    const productQuantity:{quantity:number,id:number}[]=data.productQuantity
    const products=await this.appService.list({where:{id:In(productQuantity.map(({id})=>id))}})
    const savePromises=[]

    for(const product of products){
      product.quantity=product.quantity-productQuantity.find(({id})=>id==product.id).quantity
      if(product.quantity<0) {
        return this.kafkaClient.emit("order_products_quantity_error",JSON.stringify({orderId:data.id}))
      }
      savePromises.push(this.appService.save(product))

    }

    await Promise.all(savePromises)

    // for(const {quantity,id} of productQuantity){
    //   await this.appService.decreaseQuantity(id,{by:quantity})
    // }

    this.kafkaClient.emit("order_products_fulfilled",JSON.stringify({orderId:data.id,products}))
  }
}

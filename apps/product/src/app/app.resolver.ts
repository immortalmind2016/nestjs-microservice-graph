import { Args, ID, Mutation ,Resolver,Query} from '@nestjs/graphql';
import { AppService } from './app.service';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entities/product.entity';

@Resolver(()=>Product)
export class AppResolver {
  constructor(private readonly appService: AppService) {}


  @Mutation(() => Product)
  async createProduct(@Args("payload") product:ProductDto) {
    return this.appService.create(product)
  }

  @Mutation(()=>Product)
  updateProduct(@Args("id") id:number,@Args("payload") product:ProductDto){
    return this.appService.updateById(id,product)
  }

  @Query(()=>[Product])
  listProducts(){
    return this.appService.list()
  }




}

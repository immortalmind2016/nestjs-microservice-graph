import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [ GraphQLModule.forRoot<ApolloFederationDriverConfig>({
  driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2,
    },

  }),

    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [Product],
    migrations: ['./src/migrations/*.ts'],
    // should be false for production
    synchronize: true,

  }),TypeOrmModule.forFeature([Product]),
  ClientsModule.register([
    {
      name: 'KAFKA_SERVICE_CLIENT',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'product',
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'product-consumer'
        }
      }
    },
  ]),
],
controllers:[AppController],
  providers: [AppService, AppResolver,AppController],

})
export class AppModule {}

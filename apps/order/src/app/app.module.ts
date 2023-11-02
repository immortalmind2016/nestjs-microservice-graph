import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { AppController } from './app.controller';
import { UserResolver } from './user.resolver';
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
    entities: [Order],
    migrations: ['./src/migrations/*.ts'],
    // should be false for production
    synchronize: true,

  }),TypeOrmModule.forFeature([Order]),
  ClientsModule.register([
    {
      name: 'KAFKA_SERVICE_CLIENT',
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'order',
          brokers: ['localhost:29092'],
        },
        consumer: {
          groupId: 'order-consumer'
        }
      }
    },
  ]),

],
controllers:[AppController],
  providers: [AppService, AppResolver,AppController,UserResolver],

})
export class AppModule {}

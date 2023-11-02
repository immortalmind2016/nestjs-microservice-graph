import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


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
    entities: [User],
    migrations: ['./src/migrations/*.ts'],
    // should be false for production
    synchronize: true,

  }),TypeOrmModule.forFeature([User])

],
  providers: [AppService, AppResolver],

})
export class AppModule {}

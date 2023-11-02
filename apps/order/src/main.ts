/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const kafkaApp= await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:29092'],
      },
      consumer:{
        groupId:'order-consumer'
      }
    }
  });
  const port = process.env.PORT || 3003;
  await app.listen(port);
  await kafkaApp.listen();
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/`
  );
}

bootstrap();

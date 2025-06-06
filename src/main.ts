import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestExpressApplication} from "@nestjs/platform-express";
import { join } from 'path';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'), {prefix: '/public'})

  app.enableCors({
    origin:'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // allowedHeaders: 'Content-Type, Accept, Authorization',
    // credentials: true,

  })

  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  await app.listen(3000);
}
bootstrap();

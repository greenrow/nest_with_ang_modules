import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsersModule} from "./controllers/users/users.module";
import {MongooseModule} from "@nestjs/mongoose";
import {ToursModule} from "./controllers/tours/tours.module";
import {OrderModule} from "./controllers/order/order.module";


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest'),
            UsersModule,
            ToursModule,
            OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

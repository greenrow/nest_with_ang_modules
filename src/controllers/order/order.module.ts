import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "../../schemas/order";
import {OrderController} from "./order.controller";
import {OrderService} from "../../services/order/order.service";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../../services/users/users.service";
import {User, UserSchema} from "../../schemas/user";

@Module({
    imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema}, { name: User.name, schema: UserSchema}])],
    controllers: [OrderController],
    providers: [OrderService, JwtService, UsersService]
})
export class OrderModule {}

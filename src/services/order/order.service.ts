import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Order, OrderDocument} from "../../schemas/order";
import {Model} from "mongoose";
import {OrderDto} from "../../dto/order-dto";

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>) {
    }

    async sendOrder(data: OrderDto): Promise<Order>{
        console.log('**data', data)
        const orderData = new this.orderModel(data);
        return orderData.save();
    }

    async getOrders(): Promise<Order[]>{
        return this.orderModel.find();
    }

    async getOrdersByUserId(id: string): Promise<Order[]>{
        return this.orderModel.find({userId: id});
    }
}

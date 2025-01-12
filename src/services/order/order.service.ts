import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Order, OrderDocument} from "../../schemas/order";
import mongoose, {Model} from "mongoose";
import {OrderDto} from "../../dto/order-dto";
import {IOrder} from "../../interfaces/order";
import {IUser} from "../../interfaces/user";
import {User, UserDocument} from "../../schemas/user";
@Injectable()

export class OrderService {
    constructor(@InjectModel(Order.name) private orderModel: Model<OrderDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async sendOrder(data: IOrder): Promise<Order>{
        console.log('**data', data)
        const orderData = new this.orderModel(data);
        return orderData.save();
    }

    async getOrders(): Promise<Order[]>{
        return this.orderModel.find();
    }

    async getOrdersByUserId(id: string): Promise<Order[]>{
        console.log('*****id', id)
      // return  this.orderModel.find().populate({
      //       path: 'userId',
      //       select: 'login',
      //   }).populate({
      //     path: 'tourId'
      // }).then((data) => data.filter((order) => {
      //     console.log('order', order)
      //     return (order.userId as any)._id == id;
      // }));

        this.orderModel.find({userId: id}).then((data) => {

        })
    }

}

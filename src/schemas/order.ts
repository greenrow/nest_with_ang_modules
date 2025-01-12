import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {IOrder, IOrderPerson} from "../interfaces/order";
import mongoose from "mongoose";
import {User, UserSchema} from "./user";
import {IUser} from "../interfaces/user";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order  { //remove IOrder
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Tour' }) tourId: mongoose.Schema.Types.ObjectId;
    @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'User' }) userId: mongoose.Schema.Types.ObjectId;
    @Prop({ type: Object }) orderPerson: IOrderPerson;

}   export const OrderSchema = SchemaFactory.createForClass(Order);
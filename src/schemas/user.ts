import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import {IUser, Roles} from "../interfaces/user";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {

    @Prop() psw: string;
    @Prop() login: string
    @Prop() role: Roles

}
export const UserSchema = SchemaFactory.createForClass(User);
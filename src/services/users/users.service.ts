import {BadRequestException, Delete, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../../schemas/user";
import * as bcrypt from 'bcrypt';
import {UserDto} from "../../dto/user-dto";
import {JwtService} from "@nestjs/jwt";
import {IResponseUser, IUser} from "../../interfaces/user";
import {Request} from "express";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
                private jwtService: JwtService) {
        console.log('userService run')
    }


    async getAllUsers(): Promise<User[]> {
        return this.userModel.find();
    }

    async getUserById(id): Promise<User> {
        return this.userModel.findById(id);
    }
  // changes method name on registerUSer
    async registerUser(user: IUser): Promise<boolean> {
        const defaultRole ='user';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.psw, salt);
        console.log('hashedPassword', hashedPassword)
        const newUser:IUser = {...user, psw: hashedPassword, role: defaultRole }; // add default role
        const userData = new this.userModel(newUser);
        console.log('userData', userData)
        userData.save();

        return Promise.resolve(true);
    }

    async updateUsers(id: string, user: IUser): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPsw = await bcrypt.hash(user.psw, salt);
        const hashUser = Object.assign({}, user, { psw: hashedPsw });
        return this.userModel.findByIdAndUpdate(id, hashUser);
    }

    async deleteUsers(): Promise<any> {
        return this.userModel.deleteMany()
    }

    async  deleteUserById(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
    }

    async checkAuthUser(login: string, psw: string): Promise<IUser[]> {
        const usersArr = <IUser[]>await this.userModel.find<IUser>({login: login});
        if (usersArr.length === 0 ) {
            throw new BadRequestException('Логин указан неверно'); // можно сделать общий текст ошибки
        }
        const isMatch: boolean = bcrypt.compareSync(psw, usersArr[0].psw);
        if (!isMatch) {
            throw new BadRequestException('Пароль указан неверно');
        }
        return Promise.resolve(usersArr);
    }
    
    async getUserByLogin(login: string): Promise<IUser> {
        return this.userModel.findOne({login});
    }
    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    }

    async login(user: IUser): Promise<IResponseUser> {
        const userFromDB = <IUser>await this.userModel.findOne({login:user.login}); // first find user
        const payload = {login: user.login, psw: user.psw, role: userFromDB?.role, _id: userFromDB?._id}; //ads _id
        return {
            id: userFromDB._id,
            access_token: this.jwtService.sign(payload),
            role: userFromDB.role
        } as IResponseUser;
    }

     extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}
import {Delete, Get, Injectable, Param, Post, Put} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User, UserDocument} from "../../schemas/user";
import * as bcrypt from 'bcrypt';
import {UserDto} from "../../dto/user-dto";
import {JwtService} from "@nestjs/jwt";

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

    async sendUser(data): Promise<User> {
        // const salt = await bcrypt.genSalt();
        // const hashedPsw = await bcrypt.hash(data.psw, salt);
        // const hashUser = Object.assign({}, data, { psw: hashedPsw });
         const userData = new this.userModel(data);
        return userData.save();
    }

    async updateUsers(id: string, body): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPsw = await bcrypt.hash(body.psw, salt);
        const hashUser = Object.assign({}, body, { psw: hashedPsw });
        return this.userModel.findByIdAndUpdate(id, hashUser);
    }

    async deleteUsers(): Promise<any> {
        return this.userModel.deleteMany()
    }

    async  deleteUserById(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id);
    }

    async checkAuthUser(login: string, psw: string): Promise<User[]> {
        const usersArr = await this.userModel.find({login: login});
        return usersArr.length === 0 ? null : usersArr
    }

    async checkRegUser(login: string): Promise<User[]> {
        return this.userModel.find({login: login});
    }

    async login(user: UserDto){
        const payload = {login: user.login, psw: user.psw};
        const userFromDB = await this.userModel.find({login:user.login});
        return {
            id: userFromDB[0]._id,
            access_token: this.jwtService.sign(payload)
        }
    }

}
import {IUser, Roles} from "../interfaces/user";
import {Contains, IsDefined, IsNotEmpty} from "class-validator";

export class UserDto implements IUser {
    @IsNotEmpty()
    psw: string;
    @IsNotEmpty()
    login: string;
}
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../schemas/user";
import {UserDto} from "../../dto/user-dto";
import RejectedValue = jest.RejectedValue;
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../../services/Authentication/jwt-auth.guard/jwt-auth.guard.service";
import {ValidationParamIdPipe} from "../../pipes/param-id.pipe";
import {UserAuthPipe} from "../../pipes/user-auth.pipe";
import {IUser} from "../../interfaces/user";

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}


    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }


    @Get(":id")
    getUserById(@Param('id') id): Promise<User> {
        return this.userService.getUserById(id);
    }


    @Post()
    registerUser(@Body(UserAuthPipe) data: UserDto): Promise<boolean> {
        return this.userService.checkRegUser(data.login).then((queryRes) => {
            if (queryRes.length === 0) {
                return this.userService.registerUser(data);
            } else {
                console.log('err - user exists')
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже зарегистрирован',
                }, HttpStatus.CONFLICT)
            }
        });

    }
    @UseGuards(AuthGuard('local'))
    @Post(":login")
    authUser(@Body(UserAuthPipe) data: UserDto, @Param('login') login): any  {
        return this.userService.login(data);
    }

    @Put(":id")
    updateUsers(@Param('id') id, @Body() data) : Promise<User> {
        return this.userService.updateUsers(id, data);
    }

    @Delete()
    deleteUsers(): Promise<any> {
        return this.userService.deleteUsers();
    }


    @Delete(":id")
    deleteUserById(@Param('id') id): Promise<User> {
        return this.userService.deleteUserById(id);
    }

}
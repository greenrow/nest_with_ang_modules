import {Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "../services/users/users.service";

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Get()
    getAllUsers(): string{
        return this.usersService.getAllUsers()
    }

    @Get(":id")
    getUserById(@Param('id') id): string{
        return this.usersService.getUserById(id)
    }

    @Post()
    sendAllUsers(): string{
        return this.usersService.sendAllUsers()
    }

    @Put()
    updateUsers(): string{
        return this.usersService.updateUsers()
    }

    @Delete()
    deleteUsers(): string{
        return this.usersService.deleteUsers()
    }

    @Delete(":id")
    deleteUserById(@Param('id') id): string{
        return this.usersService.deleteUserById(id)
    }
}

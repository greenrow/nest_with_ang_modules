import {Injectable, Param} from '@nestjs/common';

@Injectable()
export class UsersService {

    getAllUsers(): string{
        return "all users"
    }

    getUserById(id: string): string{
        return "user id is " + id
    }

    sendAllUsers(): string{
        return "user post data"
    }

    updateUsers(): string{
        return "user put data"
    }

    deleteUsers(): string{
        return "user delete data"
    }

    deleteUserById(id: string): string{
        return "deleted user id is " + id
    }
}

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import {JwtService} from "@nestjs/jwt";
import {jwtConstants} from "../static/private/constants";
import {Reflector} from "@nestjs/core";
import {IUser} from "../interfaces/user";
import {UsersService} from "../services/users/users.service";
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log('context',  context.getHandler());
        const token = this.extractTokenFromHeader(request);
        const userPayload = <IUser>await this.jwtService.verifyAsync(token, {secret: jwtConstants.secret});
        console.log('token', token)
        console.log('user from jwt', userPayload)
        return userPayload?.role === 'admin';
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    Headers,
    HttpException,
    HttpStatus,
    BadRequestException
} from '@nestjs/common';
import {OrderService} from "../../services/order/order.service";
import {OrderDto} from "../../dto/order-dto";
import {Order} from "../../schemas/order";
import {IUser} from "../../interfaces/user";
import {jwtConstants} from "../../static/private/constants";
import {JwtService} from "@nestjs/jwt";
import {UsersService} from "../../services/users/users.service";
import {IOrder} from "../../interfaces/order";

@Controller('order')
export class OrderController {
    constructor(private orderService: OrderService, private jwtService: JwtService, private userService: UsersService) {
    }

    @Post()
     initTours(@Body() data: OrderDto, @Req() request): void { // для обработки заголовков можно использовать декоратаор @Headers()
        // console.log('headers', headers)
        const authToken = this.userService.extractTokenFromHeader(request);
        const userPayload = <IUser>this.jwtService.verify(authToken, {secret: jwtConstants.secret});
        const orderData = {...data, userId: userPayload._id} as IOrder;
        //const orderData = new OrderDto(data.age, data.birthDay, data.cardNumber, data.tourId, data.userId);
        this.orderService.sendOrder(orderData);
    }

    @Get()
    getAllOrders(@Req() request): Promise<Order[]> {
        const authToken = this.userService.extractTokenFromHeader(request);
        const userPayload = <IUser>this.jwtService.verify(authToken, {secret: jwtConstants.secret});
        console.log('userPayload**', userPayload)
        if (userPayload?.role === 'admin') {
            return this.orderService.getOrders();
        } else if (userPayload?.role === 'user') {
            return this.orderService.getOrdersByUserId(userPayload._id);
        } else {
            throw new BadRequestException('Роль пользователя не определена');
        }
    }

    @Get(':id')
    getOrdersFromUser(@Param('id') id): Promise<Order[]>{
        return this.orderService.getOrdersByUserId(id);
    }
}

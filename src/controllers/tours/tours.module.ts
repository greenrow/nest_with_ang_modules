import { Module } from '@nestjs/common';
import {ToursController} from "./tours.controller";
import {MongooseModule} from "@nestjs/mongoose";
import {Tour, TourSchema} from "../../schemas/tour";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "../../static/private/constants";
import {ToursService} from "../../services/tours/tours.service";
import {JwtStrategyService} from "../../services/Authentication/jwt-strategy/jwt-strategy.service";
import {TourItemController} from "../tour-item/tour-item.controller";

@Module({
    controllers: [ToursController, TourItemController],
    imports: [MongooseModule.forFeature([{name: Tour.name, schema: TourSchema}]),
    PassportModule,
    JwtModule.register({
        secret: jwtConstants.secret
    })],
    providers: [ToursService, JwtStrategyService]

})
export class ToursModule {

}

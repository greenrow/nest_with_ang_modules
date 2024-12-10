import {Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, ParseUUIDPipe, Post, UseGuards} from '@nestjs/common';
import {ToursService} from "../../services/tours/tours.service";
import {Tour} from "../../schemas/tour";
import {ITour} from "../../interfaces/tour";
import {ValidationParamIdPipe} from "../../pipes/param-id.pipe";
import {JwtAuthGuard} from "../../services/Authentication/jwt-auth.guard/jwt-auth.guard.service";

@Controller('tours')
export class ToursController {

    constructor(private toursService: ToursService) {
    }

    @Post()
    initTours(): Promise<ITour[]> {
        this.toursService.generateTours();
        return this.toursService.getAllTours();
    }

    @Delete()
    removeAllTours(): void {
        this.toursService.deleteTours();
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllTours(): Promise<Tour[]> {
        return this.toursService.getAllTours();
    }

    // @Get(":id")
    // getTourById(@Param('id', ParseIntPipe) id ): Promise<Tour> {
    //     console.log('id', id)
    //     return this.toursService.getTourById(id);
    // }
    //
    @Get(":id")
    getTourById(@Param('id', ValidationParamIdPipe) id ): Promise<Tour> {
        console.log('id', id)
        return this.toursService.getTourById(id);
    }
}

import {Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ToursService} from "../../services/tours/tours.service";
import {Tour} from "../../schemas/tour";
import {ITour} from "../../interfaces/tour";

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

    @Get()
    getAllTours(): Promise<Tour[]> {
        return this.toursService.getAllTours();
    }

    @Get(":id")
    getTourById(@Param('id') id): Promise<Tour> {
        return this.toursService.getTourById(id);
    }
}

import {Controller, Delete, Get, Post, Put} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): string{
    return "all data"
  }

  @Post()
  sendAllData(): string{
    return "post data"
  }

  @Put()
  updateData(): string{
    return "put data"
  }

  @Delete()
  deleteData(): string{
    return "delete data"
  }
}

import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/helloworld')
  getHello(){
    return this.appService.getHello();
  }
  @Get('/bavo')
  getBavo(){
    return this.appService.getBavo();
  }
  @Get('/gt')
  getGt(){
    return this.appService.getGt();
  }
}

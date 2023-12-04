import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/helloworld')
  getHello() {
    return this.appService.getHello();
  }

  @Post('/sum')
  sum(@Body() data: { value1: number, value2: number }) {
    return this.appService.sum(data.value1, data.value2);
  }

  @Post('/minus')
  minus(@Body() data: { value1: number, value2: number }) {
    return this.appService.minus(data.value1, data.value2);
  }

  @Post('/multiply')
  multiply(@Body() data: { value1: number, value2: number }) {
    return this.appService.multiply(data.value1, data.value2);
  }

  @Post('/divides')
  divides(@Body() data: { value1: number, value2: number }) {
    return this.appService.divides(data.value1, data.value2);
  }

  @Post('/per')
  per(@Body() data: { value1: number, value2: number }) {
    return this.appService.per(data.value1, data.value2);
  }

  @Post('/interest')
  interest(@Body() data: { price: number, month: number, rate: number }) {
    return this.appService.interest(data.price, data.month, data.rate);
  }

  @Post('/stringLength')
  string(@Body() data: { text: string }) {
    return this.appService.string(data.text);
  }

  @Post('/stringCompare')
  stringComp(@Body() data: { text1: string, text2: string }) {
    return this.appService.stringComp(data.text1, data.text2);
  }
}

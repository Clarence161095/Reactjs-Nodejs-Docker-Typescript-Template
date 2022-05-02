/* eslint-disable import/order */
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import AppService from './app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ description: 'Returns you Hello world!' })
  @Get()
  sayHello(): string {
    return this.appService.getHello();
  }
}

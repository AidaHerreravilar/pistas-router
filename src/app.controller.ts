import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('Api')
export class AppController {
  constructor(private readonly pistaService: AppService) {}

  @Get()
  getHello(): string {
    return this.pistaService.getHello();
  }
}

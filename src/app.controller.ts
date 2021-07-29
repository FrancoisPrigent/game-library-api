import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/health-check')
  findAll(): string {
    return 'ok';
  }
}

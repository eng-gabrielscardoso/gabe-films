import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('Info')
  @ApiOperation({ summary: 'Application basic information' })
  getBasicApplicationInfo(): object {
    return this.appService.getBasicApplicationInfo();
  }
}

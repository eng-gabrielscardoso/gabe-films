import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck } from '@nestjs/terminus';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { HealthService } from './health.service';


@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @HealthCheck()
  @UseGuards(JwtAuthGuard)
  @ApiTags('Health')
  @ApiOperation({ summary: 'Checks the status of application database service' })
  check() {
    return this.healthService.check();
  }
}

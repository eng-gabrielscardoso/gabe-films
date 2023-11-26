import { Injectable } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
  ) { }

  /**
   * Check the database health status
   * @returns Promise<HealthCheckResult>
   */
  async check(): Promise<HealthCheckResult> {
    return await this.health.check([
      () => this.db.pingCheck('database'),
    ]);
  }
}

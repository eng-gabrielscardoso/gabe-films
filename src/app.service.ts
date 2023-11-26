import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  index(): object {
    return {
      name: this.configService.get('APP_NAME'),
      author: this.configService.get('APP_AUTHOR'),
    };
  }
}

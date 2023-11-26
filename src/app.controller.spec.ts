import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let configService: ConfigService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
    configService = app.get<ConfigService>(ConfigService);
  });

  describe('index', () => {
    it('should return the app info', () => {
      expect(appService.index()).toEqual({
        name: configService.get('APP_NAME'),
        author: configService.get('APP_AUTHOR'),
      });
    });
  });
});

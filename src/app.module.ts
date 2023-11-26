import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      password: process.env.DB_PASSWORD,
      username: process.env.DB_USERNAME,
      database: process.env.DB_DATABASE,
      entities: [],
      synchronize: process.env.APP_ENV === 'production' ? false : true,
      logging: process.env.APP_ENV === 'production' ? false : true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

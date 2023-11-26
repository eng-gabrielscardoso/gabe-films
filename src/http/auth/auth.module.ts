import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY || "supersecret",
      signOptions: { expiresIn: process.env.JWT_TTL || '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService]
})
export class AuthModule { }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { matchPassword } from '../../helpers';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/signin.dto';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Sign in user using DTO information
   * @param signInDto sign in DTO
   * @returns Promise<JwtPayload>
   */
  async signIn(signInDto: SignInDto): Promise<JwtPayload> {
    const user = await this.userRepository.findOneBy({
      email: signInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    try {
      const isPasswordMatch = await matchPassword(
        signInDto.password,
        user.password,
      );

      if (!isPasswordMatch) {
        throw new UnauthorizedException();
      }

      const payload = {
        email: user.email,
      };

      return {
        access_token: await this.jwtService.signAsync(payload),
        ttl: this.configService.get('JWT_TTL') || '900s',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateUserByJwt(payload: JwtPayload): Promise<any> {
    return null;
  }
}

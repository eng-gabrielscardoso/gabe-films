import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { matchPassword } from '../../helpers';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  /**
   * Returns the response for API
   * @param user 
   * @returns Partial<User>
   */
  private toResponseObject(user: User): Partial<User> {
    const { email } = user;
    return { email };
  }

  async signIn(signInDto: SignInDto): Promise<unknown> {
    const user = await this.userRepository.findOneBy({ email: signInDto.email })

    if (!user) {
      throw new UnauthorizedException()
    }

    try {
      const isPasswordMatch = await matchPassword(signInDto.password, user.password)

      if (!isPasswordMatch) {
        throw new UnauthorizedException()
      }

      return {
        access_token: await this.jwtService.signAsync(this.toResponseObject(user)),
        ttl: this.configService.get('JWT_TTL') || "60s"
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

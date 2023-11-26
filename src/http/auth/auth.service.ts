import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { matchPassword } from '../../helpers';
import { User } from '../users/entities/user.entity';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

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
        authorized: true
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}

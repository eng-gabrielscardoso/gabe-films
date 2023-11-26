import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { passwordRegEx } from '../../../helpers';

export class SignInDto {
  @IsNotEmpty()
  @IsEmail(null, { message: 'Please enter your email.' })
  @ApiProperty({ example: 'gabriel@example.com', description: 'User email' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Invalid password.`,
  })
  @ApiProperty({ example: 'Secret123456@', description: 'User password' })
  password: string;
}

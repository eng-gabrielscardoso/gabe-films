import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import { passwordRegEx } from '../../../helpers';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @MaxLength(80, { message: 'Name must have at most 80 characters.' })
  @ApiProperty({ example: 'Gabriel Santos Cardoso', description: 'User real name' })
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Nickname must have at least 3 characters.' })
  @MaxLength(16, { message: 'Nickname must have at most 16 characters.' })
  @IsAlphanumeric(null, {
    message: 'Nickname does not allow other than alpha numeric chars.',
  })
  @ApiProperty({ example: 'gabe', description: 'User nick name' })
  nickname: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  @ApiProperty({ example: 'gabriel@example.com', description: 'User email' })
  email: string;

  @IsInt()
  @Min(18, { message: 'You must be at least 18 years old.'})
  @Max(118, { message: 'Invalid age.'})
  @ApiProperty({ example: 21, description: 'User age' })
  age: number;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
  })
  @ApiProperty({ example: 'Secret123456@', description: 'User password' })
  password: string;
}
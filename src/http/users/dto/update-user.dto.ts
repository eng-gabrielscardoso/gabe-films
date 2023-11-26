import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { passwordRegEx } from '../../../helpers';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsOptional()
  @MinLength(2, { message: 'Name must have at least 2 characters.' })
  @MaxLength(80, { message: 'Name must have at most 80 characters.' })
  @ApiProperty({
    example: 'Gabriel Santos Cardoso',
    description: 'User real name',
  })
  name?: string;

  @IsOptional()
  @MinLength(3, { message: 'Nickname must have at least 3 characters.' })
  @MaxLength(16, { message: 'Nickname must have at most 16 characters.' })
  @IsAlphanumeric(null, {
    message: 'Nickname does not allow other than alphanumeric characters.',
  })
  @ApiProperty({ example: 'gabe', description: 'User nick name' })
  nickname?: string;

  @IsOptional()
  @IsEmail(null, { message: 'Please provide valid Email.' })
  @ApiProperty({ example: 'gabriel@example.com', description: 'User email' })
  email?: string;

  @IsOptional()
  @IsInt()
  @Min(18, { message: 'You must be at least 18 years old.' })
  @Max(118, { message: 'Invalid age.' })
  @ApiProperty({ example: 21, description: 'User age' })
  age?: number;

  @IsOptional()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, at least one uppercase letter, one lowercase letter, one number and one special character`,
  })
  @ApiProperty({ example: 'Secret123456@', description: 'User password' })
  password?: string;
}

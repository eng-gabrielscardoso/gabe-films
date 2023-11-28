import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFilmDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Title must have at least 1 character.' })
  @MaxLength(125, { message: 'Title must have at most 125 characters.' })
  @ApiProperty({
    example: 'There will be blood',
    description: 'The film name',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1, { message: 'Synopsis must have at least 1 character.' })
  @MaxLength(255, { message: 'Synopsis must have at most 255 characters.' })
  @ApiProperty({
    example:
      'A story of family, religion, hatred, oil and madness, focusing on a turn-of-the-century prospector in the early days of the business.',
    description: 'The film synopsis',
  })
  synopsis: string;
}

import { Optional } from '@nestjs/common';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateFilmDto } from './create-film.dto';

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
  @IsString()
  @Optional()
  @MinLength(1, { message: 'Title must have at least 1 character.' })
  @MaxLength(125, { message: 'Title must have at most 125 characters.' })
  @ApiProperty({
    example: 'There will be blood',
    description: 'The film name',
  })
  title: string;

  @IsString()
  @Optional()
  @MinLength(1, { message: 'Synopsis must have at least 1 character.' })
  @MaxLength(255, { message: 'Synopsis must have at most 255 characters.' })
  @ApiProperty({
    example: '',
    description: '',
  })
  synopsis: string;
}

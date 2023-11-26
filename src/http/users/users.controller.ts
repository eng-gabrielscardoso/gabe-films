import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiTags('Users')
  @ApiOperation({ summary: 'Create a new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiTags('Users')
  @ApiOperation({ summary: 'List all users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiTags('Users')
  @ApiOperation({ summary: 'Find a user by given ID' })
  @ApiParam({
    name: 'id',
    description: 'User unique ID',
    example: 1,
    required: true,
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiTags('Users')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    description: 'User unique ID',
    example: 1,
    required: true,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiTags('Users')
  @ApiOperation({ summary: 'Remove a user' })
  @ApiParam({
    name: 'id',
    description: 'User unique ID',
    example: 1,
    required: true,
  })
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}

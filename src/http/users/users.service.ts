import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  /**
   * Create a new user
   * @param createUserDto incoming user DTO
   * @returns Promise<User>
   */
  async create(createUserDto: CreateUserDto) {
    try {
      const user: User = new User()
      const { age, email, name, nickname, password } = createUserDto

      user.age = age
      user.email = email
      user.name = name
      user.nickname = nickname
      user.password = password

      const result = await this.userRepository.save(user);

      return result;
    } catch (error) {
      throw new Error(error)
    }
  }

  /**
   * Returns a list of users
   * @returns Promise<User[]>
   */
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Returns a user by its id
   * @param id incoming user id
   * @returns Promise<User>
   */
  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id })
  }

  /**
   * Update a user by its id
   * @param id incoming user id
   * @param updateUserDto incoming user DTO
   * @returns Promise<User>
   */
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findOneBy({ id });

      if (!existingUser) {
        throw new Error('User not found');
      }

      const { age, email, name, nickname, password } = updateUserDto;

      existingUser.age = age;
      existingUser.email = email;
      existingUser.name = name;
      existingUser.nickname = nickname;
      existingUser.password = password;

      const result = await this.userRepository.save(existingUser);

      return result;
    } catch (error) {
      throw error
    }
  }

  /**
   * Remove a user by its id
   * @param id incoming user id
   * @returns Promise<{ affected?: number}>
   */
  async remove(id: number): Promise<{ affected?: number }> {
    return await this.userRepository.delete(id)
  }
}

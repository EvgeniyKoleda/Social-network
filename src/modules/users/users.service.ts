import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PROVIDER_CONSTS } from './utils/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDER_CONSTS.USER_REPOSITORY)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    let cretedUser = new User();
    let user = Object.assign(cretedUser, createUserDto);

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.save({ id, ...updateUserDto });

    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<{ id: string }> {
    await this.userRepository.delete(id);

    return { id };
  }
}

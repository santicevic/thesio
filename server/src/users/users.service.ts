import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}

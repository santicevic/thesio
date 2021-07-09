import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
  getByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
  create(userToAdd: Partial<User>): Promise<User> {
    return this.usersRepository.save(userToAdd);
  }
}

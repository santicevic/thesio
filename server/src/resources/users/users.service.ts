import { Injectable, Inject } from '@nestjs/common';
import { UserRole } from 'src/database/enums';
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
  getProfessors(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: UserRole.PROFESSOR } });
  }
  getByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
  }
  getByEmailWithPassword(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['firstName', 'lastName', 'email', 'password', 'role', 'study'],
    });
  }
  create(userToCreate: Partial<User>): Promise<User> {
    return this.usersRepository.save(userToCreate);
  }
  update(userToUpdate: Partial<User>): Promise<any> {
    return this.usersRepository.update(userToUpdate.id, userToUpdate);
  }
}

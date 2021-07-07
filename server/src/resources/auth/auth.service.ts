import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { validateHash } from '../../utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (!user || !validateHash(password, user.password)) {
      return null;
    }
    return { ...user, password: undefined };
  }
  async login(user: User) {
    const payload = { email: user.email, role: user.role, sub: user.id };
    return this.jwtService.sign(payload);
  }
}

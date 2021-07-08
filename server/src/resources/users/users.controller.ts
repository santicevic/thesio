import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UserRole } from 'src/database/enums';
import { Roles } from 'src/decorators/roles';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RoleGuard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @Roles(UserRole.ADMIN, UserRole.OFFICE)
  @UseGuards(RolesGuard)
  getAll() {
    return this.usersService.getAll();
  }
  @Get('me')
  async me(@Request() req): Promise<User> {
    return this.usersService.getByEmail(req.user.email);
  }
}

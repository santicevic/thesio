import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/database/enums';
import { Roles } from 'src/decorators/roles';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RoleGuard';
import { User } from '../users/user.entity';
import { Subject } from '../subjects/subject.entity';
import { SubjectsService } from './subjects.service';

@Controller('subjects')
@UseGuards(JwtAuthGuard)
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  getAll() {
    return this.subjectsService.getAll();
  }
  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() body): Promise<Subject> {
    return this.subjectsService.create(body);
  }
  @Patch()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async update(@Body() body): Promise<Subject> {
    return this.subjectsService.update(body);
  }
}

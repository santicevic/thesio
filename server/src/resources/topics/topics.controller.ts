import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/database/enums';
import { Roles } from 'src/decorators/roles';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RoleGuard';
import { Topic } from './topic.entity';
import { TopicsService } from './topics.service';

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}
  @Get()
  getAll() {
    return this.topicsService.getAll();
  }
  @Post()
  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  async create(@Body() body): Promise<Topic> {
    return this.topicsService.create(body);
  }
  @Patch()
  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  async update(@Body() body): Promise<Topic> {
    return this.topicsService.update(body);
  }
}

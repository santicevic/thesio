import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserRole } from 'src/database/enums';
import { Roles } from 'src/decorators/roles';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RoleGuard';
import { SubjectsService } from '../subjects/subjects.service';
import { Topic } from './topic.entity';
import { TopicsService } from './topics.service';

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
  constructor(
    private readonly topicsService: TopicsService,
    private readonly subjectsRepository: SubjectsService,
  ) {}

  @Get()
  getAll() {
    return this.topicsService.getAll();
  }

  @Post()
  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  async create(@Body() body, @Request() req): Promise<Topic> {
    const subject = await this.subjectsRepository.getById(body.subject);
    if (subject.professor.id !== req.user.id) {
      throw new UnauthorizedException('User is not subject professor');
    }

    return this.topicsService.create(body);
  }

  @Patch()
  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  async update(@Body() body, @Request() req): Promise<Topic> {
    const subject = await this.subjectsRepository.getById(body.subject);
    if (subject.professor.id !== req.user.id) {
      throw new UnauthorizedException('User is not subject professor');
    }

    return this.topicsService.update(body);
  }
}

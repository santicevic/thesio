import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { TopicsService } from './topics.service';

@Controller('topics')
@UseGuards(JwtAuthGuard)
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}
  @Get()
  getAll() {
    return this.topicsService.getAll();
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @Inject('TOPIC_REPOSITORY')
    private topicsRepository: Repository<Topic>,
  ) {}

  async getAll(): Promise<Topic[]> {
    return this.topicsRepository.find();
  }
}

import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Topic } from './topic.entity';

@Injectable()
export class TopicsService {
  constructor(
    @Inject('TOPIC_REPOSITORY')
    private topicsRepository: Repository<Topic>,
  ) {}

  getAll(): Promise<Topic[]> {
    return this.topicsRepository.find();
  }

  create(topicToCreate: Partial<Topic>): Promise<Topic> {
    return this.topicsRepository.save(topicToCreate);
  }

  update(topicToUpdate: Partial<Topic>): Promise<any> {
    return this.topicsRepository.update(topicToUpdate.id, {
      title: topicToUpdate.title,
      description: topicToUpdate.description,
    });
  }
}

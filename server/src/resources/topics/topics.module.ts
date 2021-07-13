import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { topicProviders } from './topics.providers';
import { DatabaseModule } from '../../database/database.module';
import { SubjectsService } from '../subjects/subjects.service';
import { subjectProviders } from '../subjects/subjects.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [TopicsController],
  providers: [
    ...topicProviders,
    TopicsService,
    SubjectsService,
    ...subjectProviders,
  ],
})
export class TopicsModule {}

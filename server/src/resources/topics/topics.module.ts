import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { topicProviders } from './topics.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TopicsController],
  providers: [...topicProviders, TopicsService],
})
export class TopicsModule {}

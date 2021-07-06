import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { subjectProviders } from './subjects.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SubjectsController],
  providers: [...subjectProviders, SubjectsService],
})
export class SubjectsModule {}

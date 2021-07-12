import { Module } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplicationsController } from './applications.controller';
import { applicationProviders } from './applications.providers';
import { DatabaseModule } from '../../database/database.module';
import { ConfigsService } from '../configs/configs.service';
import { configProviders } from '../configs/configs.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ApplicationsController],
  providers: [
    ...applicationProviders,
    ApplicationsService,
    ...configProviders,
    ConfigsService,
  ],
})
export class ApplicationsModule {}

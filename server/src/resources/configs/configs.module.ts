import { Module } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigsController } from './configs.controller';
import { configProviders } from './configs.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ConfigsController],
  providers: [...configProviders, ConfigsService],
})
export class ConfigsModule {}

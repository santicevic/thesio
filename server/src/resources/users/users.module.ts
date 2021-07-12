import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { DatabaseModule } from '../../database/database.module';
import { configProviders } from '../configs/configs.providers';
import { ConfigsService } from '../configs/configs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...userProviders,
    UsersService,
    ...configProviders,
    ConfigsService,
  ],
  exports: [UsersService],
})
export class UsersModule {}

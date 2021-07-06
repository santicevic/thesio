import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './resources/users/users.module';
import { SubjectsModule } from './resources/subjects/subjects.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, SubjectsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

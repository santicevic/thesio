import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './resources/users/users.module';
import { SubjectsModule } from './resources/subjects/subjects.module';
import { TopicsModule } from './resources/topics/topics.module';
import { ApplicationsModule } from './resources/applications/applications.module';
import { ConfigsModule } from './resources/configs/configs.module';
import { AuthModule } from './resources/auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    SubjectsModule,
    TopicsModule,
    ApplicationsModule,
    ConfigsModule,
    AuthModule,
  ],
})
export class AppModule {}

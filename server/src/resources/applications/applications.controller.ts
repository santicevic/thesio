import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Request,
  ConflictException,
} from '@nestjs/common';
import { ApplicationStatus, UserRole } from 'src/database/enums';
import { Roles } from 'src/decorators/roles';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RoleGuard';
import { ConfigsService } from '../configs/configs.service';
import { Application } from './application.entity';
import { ApplicationsService } from './applications.service';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(
    private readonly applicationsService: ApplicationsService,
    private readonly configsService: ConfigsService,
  ) {}
  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getAll() {
    return this.applicationsService.getAll();
  }
  @Post('apply')
  @Roles(UserRole.STUDENT)
  @UseGuards(RolesGuard)
  async apply(@Body() body, @Request() req): Promise<Application> {
    const applications = await this.applicationsService.getByStudentEmail(
      req.user.email,
    );
    const yearConfig = await this.configsService.getByKey('year');
    if (applications.some(({ year }) => year === yearConfig.value)) {
      throw new ConflictException('User already has open application');
    }

    return this.applicationsService.create({
      applicationDate: new Date(),
      status: ApplicationStatus.DRAFT,
      topic: body.topic,
      student: req.user.id,
      mentor: body.mentor,
      year: yearConfig.value,
    });
  }
}

import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Request,
  ConflictException,
  BadRequestException,
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
  @Get('get-application')
  @Roles(UserRole.STUDENT)
  @UseGuards(RolesGuard)
  async getApplication(@Request() req): Promise<Application | undefined> {
    const applications = await this.applicationsService.getByStudentEmail(
      req.user.email,
    );
    const yearConfig = await this.configsService.getByKey('year');
    return Promise.resolve(
      applications.find(({ year }) => year === yearConfig.value),
    );
  }
  @Post('apply-defense')
  @Roles(UserRole.STUDENT)
  @UseGuards(RolesGuard)
  async applyDefense(@Request() req): Promise<Application> {
    const applications = await this.applicationsService.getByStudentEmail(
      req.user.email,
    );
    const yearConfig = await this.configsService.getByKey('year');
    const application = applications.find(
      ({ year }) => year === yearConfig.value,
    );
    if (!application) {
      throw new BadRequestException('Application does not exist');
    }
    application.status = ApplicationStatus.PENDING_MENTOR;

    return this.applicationsService.save(application);
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

    return this.applicationsService.save({
      applicationDate: new Date(),
      status: ApplicationStatus.DRAFT,
      topic: body.topic,
      student: req.user.id,
      mentor: body.mentor,
      year: yearConfig.value,
    });
  }
}

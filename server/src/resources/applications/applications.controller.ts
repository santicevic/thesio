import {
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Body,
  Request,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
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

  @Patch('apply-defense')
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
      throw new NotFoundException('Application does not exist');
    }
    if (application.status !== ApplicationStatus.DRAFT) {
      throw new ConflictException('Application already submited');
    }
    application.status = ApplicationStatus.PENDING_MENTOR;

    return this.applicationsService.save(application);
  }

  @Get('mentor')
  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  getMentorApplications(@Request() req) {
    return this.applicationsService.getByMentor(req.user.id);
  }

  @Get('pending-defenses')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async getPendingDefenses() {
    const yearConfig = await this.configsService.getByKey('year');
    return this.applicationsService.getPendingAdmin(yearConfig.value);
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

  @Patch('mentor-accept')
  @Roles(UserRole.PROFESSOR)
  @UseGuards(RolesGuard)
  async mentorAccept(@Body() body, @Request() req): Promise<Application> {
    const application = await this.applicationsService.getById(
      body.applicationId,
    );
    if (
      application.mentor.id !== req.user.id ||
      application.status !== ApplicationStatus.PENDING_MENTOR
    ) {
      throw new UnauthorizedException('User is not authorized!');
    }
    application.status = body.accepted
      ? ApplicationStatus.PENDING_ADMIN
      : ApplicationStatus.DRAFT;

    return this.applicationsService.save(application);
  }

  @Patch('schedule')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async shedule(@Body() body): Promise<Application> {
    const application = await this.applicationsService.getById(
      body.applicationId,
    );

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    const comitee = [
      application.mentor.id,
      body.president,
      body.third,
      body.fourth,
    ];
    const hasDuplicates = new Set(comitee).size !== comitee.length;

    if (!body.president || !body.third || !body.defenseDate || hasDuplicates) {
      throw new BadRequestException('Invalid request');
    }

    if (application.status !== ApplicationStatus.PENDING_ADMIN) {
      throw new ConflictException('Application can not be scheduled');
    }

    application.status = ApplicationStatus.SCHEDULED;
    application.president = body.president;
    application.third = body.third;
    application.fourth = body.fourth;
    application.defenseDate = body.defenseDate;

    return this.applicationsService.save(application);
  }

  @Get('pending-grade')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getPendingGrade(): Promise<Application[]> {
    return this.applicationsService.getPendingGrade();
  }

  @Patch('set-grade')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async setGrade(@Body() body): Promise<Application> {
    const application = await this.applicationsService.getById(
      body.applicationId,
    );

    if (!application) {
      throw new NotFoundException('Application not found');
    }

    if (
      !body.grade ||
      Number.isNaN(+body.grade) ||
      body.grade > 5 ||
      body.grade < 1
    ) {
      throw new BadRequestException('Invalid request body');
    }

    if (body.grade === 1) {
      application.status = ApplicationStatus.DRAFT;
      application.defenseDate = null;
      application.president = null;
      application.third = null;
      application.fourth = null;
    } else {
      application.status = ApplicationStatus.DONE;
      application.grade = body.grade;
    }

    return this.applicationsService.save(application);
  }
}

import {
  Controller,
  Get,
  UseGuards,
  Request,
  Post,
  Body,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { UserRole } from 'src/database/enums';
import { Roles } from 'src/decorators/roles';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RoleGuard';
import { generateHash } from 'src/utils/crypto';
import { ConfigsService } from '../configs/configs.service';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly configsService: ConfigsService,
  ) {}

  @Get('students')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getStudents(): Promise<User[]> {
    return this.usersService.getStudents();
  }
  @Get('student')
  @Roles(UserRole.STUDENT)
  @UseGuards(RolesGuard)
  async getStudentTopics(@Request() req): Promise<any> {
    const studentTopics = await this.usersService.getStudentTopics(
      req.user.email,
    );
    const yearConfig = await this.configsService.getByKey('year');

    return {
      ...studentTopics,
      hasApplied: studentTopics.applications.some(
        ({ year }) => year === yearConfig.value,
      ),
      enrolledSubjects: studentTopics.enrolledSubjects.map((subject) => ({
        ...subject,
        topics: subject.topics.map((topic) => ({
          title: topic.title,
          description: topic.description,
          id: topic.id,
          isAvailable: !topic.applications.some(
            (application) => application.year === yearConfig.value,
          ),
        })),
      })),
    };
  }

  @Get('count')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  count(): Promise<number> {
    return this.usersService.count();
  }
  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getAll() {
    return this.usersService.getAll();
  }
  @Get('professors')
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getProfessors() {
    return this.usersService.getProfessors();
  }
  @Get('me')
  me(@Request() req): Promise<User> {
    return this.usersService.getByEmail(req.user.email);
  }
  @Post()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  async create(@Body() body): Promise<User> {
    const user = await this.usersService.getByEmail(body.email);
    if (user) {
      throw new BadRequestException('The provided email is already taken!');
    }

    if (body.role === UserRole.STUDENT && !body.studentLevel) {
      throw new BadRequestException('Student must have studentLevel');
    }

    return this.usersService.create({
      ...body,
      studentLevel: body.role === UserRole.STUDENT ? body.studentLevel : null,
      password: generateHash(body.password),
    });
  }
  @Patch()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  update(@Body() body): Promise<User> {
    if (body.role === UserRole.STUDENT && !body.studentLevel) {
      throw new BadRequestException('Student must have studentLevel');
    }

    return this.usersService.update({
      ...body,
      studentLevel: body.role === UserRole.STUDENT ? body.studentLevel : null,
    });
  }
}

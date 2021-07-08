import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/database/enums';
import { Roles } from 'src/decorators/roles';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RoleGuard';
import { ApplicationsService } from './applications.service';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}
  @Get()
  @Roles(UserRole.ADMIN, UserRole.OFFICE)
  @UseGuards(RolesGuard)
  getAll() {
    return this.applicationsService.getAll();
  }
}

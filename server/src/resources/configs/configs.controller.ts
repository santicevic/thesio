import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserRole } from 'src/database/enums';
import { Roles } from 'src/decorators/roles';
import { JwtAuthGuard } from 'src/guards/JwtAuthGuard';
import { RolesGuard } from 'src/guards/RoleGuard';
import { ConfigsService } from './configs.service';

@Controller('configs')
@UseGuards(JwtAuthGuard)
export class ConfigsController {
  constructor(private readonly configsService: ConfigsService) {}
  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  getAll() {
    return this.configsService.getAll();
  }
}

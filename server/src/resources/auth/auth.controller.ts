import {
  Controller,
  Request,
  Response,
  Post,
  UseGuards,
  HttpCode,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/JwtAuthGuard';
import { LocalAuthGuard } from '../../guards/LocalAuthGuard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req, @Response({ passthrough: true }) res) {
    const jwt = await this.authService.login(req.user);
    res.cookie('token', jwt, {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
  }
  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Response({ passthrough: true }) res) {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'None',
      secure: true,
    });
  }
}

import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthParameters } from './dtos/auth-parameters';
import { TokenPayload } from './dtos/token-payload';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() params: AuthParameters) {
    try {
      return this.authService.register(params.login, params.password);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Post('login')
  login(@Body() params: AuthParameters) {
    try {
      return this.authService.login(params.login, params.password);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  auth() {}
}

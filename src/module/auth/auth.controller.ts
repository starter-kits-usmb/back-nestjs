import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthParameters } from './dtos/auth-parameters';
import { TokenPayload } from './dtos/token-payload';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() params: AuthParameters) {
    return this.authService.register(params.login, params.password);
  }

  @Post('login')
  login(@Body() params: AuthParameters) {
    return this.authService.login(params.login, params.password);
  }

  @Post('verify')
  auth(@Body() params: TokenPayload) {
    return this.authService.auth(params.token);
  }
}

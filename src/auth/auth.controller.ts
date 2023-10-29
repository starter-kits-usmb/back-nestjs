import { Body, Controller, Post } from '@nestjs/common';
import { AuthParameters } from 'src/models/dtos/auth/auth-parameters';
import { TokenPayload } from 'src/models/dtos/auth/token-payload';
import { AuthService } from './auth.service';

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

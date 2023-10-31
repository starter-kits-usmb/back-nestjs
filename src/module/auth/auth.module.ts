import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { configService } from '../../config/config.service';

@Module({
  imports: [
    HttpModule,
    UserModule,
    JwtModule.register({
      secret: configService.getPassportConfig().secretOrKey,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}

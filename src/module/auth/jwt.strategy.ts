import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { configService } from '../../config/config.service';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    let conf = configService.getPassportConfig();
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: conf.secretOrKey,
    });
  }

  async validate(payload: any, done: Function) {
    console.log('payload', payload);
    //if there is not token in payload
    if (!payload) {
      return done(null, false);
    }
    let user = await this.userService.findOne(payload.sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }
}

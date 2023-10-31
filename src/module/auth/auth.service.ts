import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { configService } from '../../config/config.service';
import { AuthPayload } from './dtos/auth-payload';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { TokenPayload } from './dtos/token-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private url_prefix = configService.getAuthProviderUrl();

  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(login: string, password: string): Promise<AuthPayload> {
    //encode password
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    let response: AuthPayload;
    try {
      let res = await this.userService.create({
        username: login,
        password: hash,
      });
      response = {
        id: res.id,
        username: res.username,
      };
    } catch (error) {
      throw new HttpException('User already exist', HttpStatus.NOT_ACCEPTABLE);
    }

    return response;
  }

  async login(login: string, password: string): Promise<TokenPayload> {
    let user = await this.userService.findOneByUsername(login);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    //compare password
    const passwordHash = await this.userService.getPasswordHash(user.id);
    const match = await bcrypt.compare(password, passwordHash);
    if (!match) {
      throw new HttpException('Wrong credentials', HttpStatus.UNAUTHORIZED);
    }

    //generate token
    const token = this.jwtService.sign({ sub: user.id });

    return {
      token: token,
    };
  }
}

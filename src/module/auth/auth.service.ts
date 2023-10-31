import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { configService } from '../../config/config.service';
import { AuthPayload } from './dtos/auth-payload';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private url_prefix = configService.getAuthProviderUrl();

  constructor(private httpService: HttpService) {}

  async register(login: string, password: string): Promise<AuthPayload> {
    const params = { login, password };
    const { data } = await firstValueFrom(
      this.httpService.post<AuthPayload>(this.url_prefix + 'user', params).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error);
          throw error;
        }),
      ),
    );
    return data;
  }

  async login(login: string, password: string): Promise<AuthPayload> {
    const params = { login, password };
    const { data } = await firstValueFrom(
      this.httpService
        .post<AuthPayload>(this.url_prefix + 'login', params)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw error;
          }),
        ),
    );
    return data;
  }

  async auth(token: string): Promise<AuthPayload> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<AuthPayload>(this.url_prefix + 'user/auth', { token })
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error);
            throw error;
          }),
        ),
    );

    return data;
  }
}

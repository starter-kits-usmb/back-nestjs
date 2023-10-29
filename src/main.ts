import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './services/config/config.service';
import { cp } from 'fs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MAIN');
  logger.log(`Server running on port ${configService.getPort()}`);
  await app.listen(configService.getPort());
}
bootstrap();

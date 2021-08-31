import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { IConfig } from 'config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const serverConfig = <IConfig>config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors();

  const port: number = Number(process.env.PORT) || serverConfig.get('port');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}

bootstrap();

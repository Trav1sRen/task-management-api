import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { IConfig } from 'config';

async function bootstrap() {
  const serverConfig = <IConfig>config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  const port: number = Number(process.env.PORT) || serverConfig.get('port');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

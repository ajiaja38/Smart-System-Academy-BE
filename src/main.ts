import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { INestApplication, Logger } from '@nestjs/common';

const bootstrap = async () => {
  const port: string | number = process.env.PORT || 3000;

  initializeTransactionalContext();

  const app: INestApplication = await NestFactory.create(AppModule);

  app.enableCors();

  await app.listen(port, '0.0.0.0');
  Logger.log(`🚀 Application is running on -> http://localhost:${port}`);
};

bootstrap();

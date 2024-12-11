import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { INestApplication, Logger, RequestMethod } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

const bootstrap = async () => {
  const port: string | number = process.env.PORT || 3000;
  const globalPrefix: string = 'api/v1';

  initializeTransactionalContext();

  const app: INestApplication =
    await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.setGlobalPrefix(globalPrefix, {
    exclude: [
      {
        path: 'metrics',
        method: RequestMethod.GET,
      },
    ],
  });

  await app.listen(port, '0.0.0.0');
  Logger.log(
    `🚀 Application now running on -> http://localhost:${port}/${globalPrefix}`,
  );
};

bootstrap();

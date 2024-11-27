import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { IResponseEntity } from 'src/types/interface/IResponseEntity.interface';
import { initializeTransactionalContext } from 'typeorm-transactional';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(() => {
    initializeTransactionalContext();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableCors();
    app.setGlobalPrefix('api/v1');

    await app.init();
  });

  it('/api/v1 (GET)', () => {
    const response: IResponseEntity<any> = {
      code: 200,
      status: true,
      message: 'Successfully retrieve data',
      data: 'Hello Smart System Academy!',
    };

    return request(app.getHttpServer())
      .get('/api/v1')
      .expect(200)
      .expect(response);
  });
});

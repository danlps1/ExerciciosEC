import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { GradeDto } from '../src/dto/grade.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Deve criar uma grade', async () => {
    const dto: GradeDto = { materiasId: [1, 2, 3, 4, 5] };

    const response = await request(app.getHttpServer())
      .post('/grade')
      .send(dto)
      .expect(201)

    expect(response.body).toHaveProperty('materias');
    expect(response.body).toHaveProperty('id');
  });

  afterAll(async () => {
    await app.close();
  });
});

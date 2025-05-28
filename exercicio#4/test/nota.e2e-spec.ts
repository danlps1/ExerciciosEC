import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AlunoDto } from '../src/dto/aluno.dto';
import { NotaDto } from '../src/dto/nota.dto';

describe('NotaController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Deve lançar a nota de um aluno', async () => {
    const dto: NotaDto = { nota: 10, alunoId: 1, materiaId: 1 };

    const response = await request(app.getHttpServer())
      .post('/nota')
      .send(dto)
      .expect(201);

    expect(response.body).toHaveProperty('aluno');
    expect(response.body).toHaveProperty('materia');
    expect(response.body).toHaveProperty("nota")
  });

  afterAll(async () => {
    await app.close();
  });
});

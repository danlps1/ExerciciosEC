import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {App} from 'supertest/types';
import {AppModule} from '../src/app.module';
import {AlunoDto} from "../src/dto/aluno.dto";

describe('AlunoController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Deve cadastrar um Aluno', async () => {
        const dto: AlunoDto = {nome: "Daniel", gradeId: 1};

        const response = await request(app.getHttpServer())
            .post("/aluno")
            .send(dto)
            .expect(201)

        expect(response.body).toHaveProperty('id');
        expect(response.body.grade.id).toBe(1);
        expect(response.body.nome).toBe("Daniel");
    });

    it('Deve retornar um aluno ', async () => {

        const response = await request(app.getHttpServer())
            .get('/aluno')
            .expect(200)
    });

    it('Deve retornar um aluno por id', async () => {
        return request(app.getHttpServer())
            .get("/aluno/1")
            .expect(200)
    });

    it('Deve exibir os melhores alunos com base no score', async () => {
        return request(app.getHttpServer())
            .get("/aluno/ranking")
            .expect(200)
    });

    afterAll(async () => {
        await app.close();
    });

})
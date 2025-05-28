import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {App} from 'supertest/types';
import {AppModule} from '../src/app.module';
import {MateriaDto} from "../src/dto/materia.dto";
import {Test, TestingModule} from "@nestjs/testing";


describe('MateriaController (e2e)', () => {
    let app: INestApplication<App>;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('Deve cadastrar uma materia ', async () => {
        const dto: MateriaDto = {nome: "Matemática"};

        const response = await request(app.getHttpServer())
            .post("/materia")
            .send(dto)
            .expect(201)

        expect(response.body).toHaveProperty("id");
        expect(response.body.nome).toBe("Matemática");
    });

    afterAll(async () => {
        await app.close();
    });
})
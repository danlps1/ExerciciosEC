import {Test, TestingModule} from "@nestjs/testing";
import {NotaService} from "./nota.service";
import {NotaDto} from "../../dto/nota.dto";
import {AlunoEntity} from "../../entity/aluno.entity";
import {NotaEntity} from "../../entity/nota.entity";
import {MateriaEntity} from "../../entity/materia.entity";

describe('NotaService Testes', () => {
    let notaService: NotaService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [NotaService],
        }).compile();

        notaService = module.get<NotaService>(NotaService);
    });

    it('should be defined', () => {
        expect(notaService).toBeDefined();
    });

    it('deve cadastrar uma nota', async () => {
        const aluno = new AlunoEntity();
        aluno.id = 1;

        const materia = new MateriaEntity();
        materia.id = 1;

        const notaExistente = new NotaEntity();
        notaExistente.id = 1;
        notaExistente.nota = 70;

        const dto: NotaDto = {
            alunoId: aluno.id,
            nota: 80,
            materiaId: materia.id,
        };

        jest.spyOn(AlunoEntity, 'findOne').mockResolvedValue(aluno);
        jest.spyOn(MateriaEntity, 'findOne').mockResolvedValue(materia);
        const mockGetMany = jest.fn().mockResolvedValue([notaExistente]);

        jest.spyOn(NotaEntity, 'createQueryBuilder').mockReturnValue({
            where: () => ({
                andWhere: () => ({
                    orderBy: () => ({
                        getMany: mockGetMany,
                    }),
                }),
            }),
        } as any);

        const notaEsperada = new NotaEntity();
        notaEsperada.id = 2;
        notaEsperada.nota = dto.nota;
        notaEsperada.aluno = aluno;
        notaEsperada.materia = materia;

        jest.spyOn(NotaEntity, 'save').mockResolvedValue(notaEsperada);
        const result = await notaService.lancarNotas(dto);

        expect(result).toEqual(notaEsperada);
    });

    it('deve lançar erro se a matéria já foi concluída', async () => {
        jest.spyOn(AlunoEntity, 'findOne').mockResolvedValue({ id: 1 } as AlunoEntity);
        jest.spyOn(MateriaEntity, 'findOne').mockResolvedValue({ id: 1 } as MateriaEntity);

        const notasSimuladas = [
            { nota: 85 },
            { nota: 90 },
            { nota: 80 },
        ];
        jest.spyOn(NotaEntity, 'createQueryBuilder').mockReturnValue({
            where: () => ({
                andWhere: () => ({
                    orderBy: () => ({
                        getMany: () => Promise.resolve(notasSimuladas),
                    }),
                }),
            }),
        } as any);

        const dto: NotaDto = { alunoId: 1, nota: 75, materiaId: 1 };

        await expect(notaService.lancarNotas(dto)).rejects.toThrow(
            'Matéria já concluída! Não pode lançar mais notas.'
        );
    });


})
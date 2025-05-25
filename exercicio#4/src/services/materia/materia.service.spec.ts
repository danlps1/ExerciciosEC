import { Test, TestingModule } from '@nestjs/testing';
import { MateriaService } from './materia.service';
import { MateriaDto } from '../../dto/materia.dto';

describe('UserService Testes', () => {
  let materiaService: MateriaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [MateriaService],
    }).compile();

    materiaService = moduleFixture.get<MateriaService>(MateriaService);
  });

  it('should be defined', () => {
    expect(materiaService).toBeDefined();
  });

  it('Deve cadastrar uma matéria', async () => {
    const materia: MateriaDto = { nome: 'Português' };
    materiaService.cadastrarMateria = jest.fn().mockReturnValueOnce({ nome: materia });
    const result = await materiaService.cadastrarMateria(materia);
    expect(result.nome).toEqual(materia);
  });
});

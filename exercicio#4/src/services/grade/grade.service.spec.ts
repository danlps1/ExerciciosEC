import { Test, TestingModule } from '@nestjs/testing';
import { GradeService } from './grade.service';
import { GradeDto } from '../../dto/grade.dto';
import { MateriaEntity } from '../../entity/materia.entity';
import { GradeEntity } from '../../entity/grade.entity';

describe('GradeService Testes', () => {
  let gradeService: GradeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradeService],
    }).compile();

    gradeService = module.get<GradeService>(GradeService);
  });

  it('should be defined', () => {
    expect(gradeService).toBeDefined();
  });

  it('deve criar uma grade com sucesso', async () => {
    const dto: GradeDto = { materiasId: [1, 2, 3, 4, 5] };

    const materias = dto.materiasId.map((id) => {
      const materia = new MateriaEntity();
      materia.id = id;
      return materia;
    });

    jest.spyOn(MateriaEntity, 'find').mockResolvedValue(materias);

    const grade = new GradeEntity();
    grade.id = 1;
    grade.materias = materias;

    jest.spyOn(GradeEntity, 'save').mockResolvedValue(grade);

    const resultado = await gradeService.criarGrade(dto);

    expect(resultado).toEqual(grade);
  });

  it('deve lançar erro se tiver menos de 5 matérias', async () => {
    const dto: GradeDto = { materiasId: [1, 2, 3] };

    await expect(gradeService.criarGrade(dto)).rejects.toThrow(
      'Uma grade deve ter no minimo 5 matérias!',
    );
  });
});

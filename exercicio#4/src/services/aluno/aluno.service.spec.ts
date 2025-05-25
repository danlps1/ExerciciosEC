import { Test, TestingModule } from '@nestjs/testing';
import { AlunoService } from './aluno.service';
import { AlunoDto } from '../../dto/aluno.dto';
import { AlunoEntity } from '../../entity/aluno.entity';
import { GradeEntity } from '../../entity/grade.entity';
import { NotaEntity } from '../../entity/nota.entity';

describe('AlunoService', () => {
  let alunoService: AlunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlunoService],
    }).compile();

    alunoService = module.get<AlunoService>(AlunoService);
  });

  it('should be defined', () => {
    expect(alunoService).toBeDefined();
  });

  it('deve cadastrar um aluno', async () => {
    const dto: AlunoDto = { nome: 'Daniel', gradeId: 1 };

    const grade = new GradeEntity();
    grade.id = 1;

    const alunoSalvo = new AlunoEntity();
    alunoSalvo.id = 1;
    alunoSalvo.nome = dto.nome;
    alunoSalvo.grade = grade;

    jest.spyOn(GradeEntity, 'findOne').mockResolvedValue(grade);
    jest.spyOn(AlunoEntity, 'save').mockResolvedValue(alunoSalvo);

    const result = await alunoService.cadastrarAluno(dto);
    expect(result).toEqual(alunoSalvo);
  });

  it('deve retornar o histórico de um aluno específico por id', async () => {
    const aluno = new AlunoEntity();
    aluno.id = 1;
    aluno.nome = 'Daniel';
    aluno.grade = new GradeEntity();

    jest.spyOn(AlunoEntity, 'findOne').mockResolvedValue(aluno);

    const result = await alunoService.historicoAluno(1);
    expect(result).toEqual(aluno);
  });

  it('deve retornar o histórico de todos os alunos quando nenhum id é informado', async () => {
    const aluno1 = new AlunoEntity();
    aluno1.id = 1;
    aluno1.nome = 'João';

    const aluno2 = new AlunoEntity();
    aluno2.id = 2;
    aluno2.nome = 'Maria';

    jest.spyOn(AlunoEntity, 'find').mockResolvedValue([aluno1, aluno2]);

    const result = await alunoService.historicoAluno();
    expect(result).toEqual([aluno1, aluno2]);
  });

  it('deve retornar os melhores alunos por score', async () => {
    const aluno = new AlunoEntity();
    aluno.id = 1;
    aluno.nome = 'Daniel';

    const nota1 = new NotaEntity();
    nota1.nota = 90;
    const nota2 = new NotaEntity();
    nota2.nota = 85;
    const nota3 = new NotaEntity();
    nota3.nota = 88;

    aluno.notas = [nota1, nota2, nota3];

    jest.spyOn(AlunoEntity, 'find').mockResolvedValue([aluno]);

    const result = await alunoService.melhoresAlunosPorScore();

    expect(result).toEqual([
      {
        aluno,
        melhoresNotas: [90, 88, 85],
        score: (90 + 88 + 85) / 3,
      },
    ]);
  });
});

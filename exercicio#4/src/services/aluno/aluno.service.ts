import {Injectable} from '@nestjs/common';
import {AlunoDto} from "../../dto/aluno.dto";
import {AlunoEntity} from "../../entity/aluno.entity";
import {GradeEntity} from "../../entity/grade.entity";
import any = jasmine.any;
import {ScoreAlunos} from "../../model/types/scoreAlunos.type";
import {map} from "rxjs";

@Injectable()
export class AlunoService {

    async cadastrarAluno(dto: AlunoDto) {

        const grade = await GradeEntity.findOne({where: {id: dto.gradeId}})
        if (!grade)
            throw new Error("Grade não existe ou não foi criada!");

        const aluno = new AlunoEntity();
        aluno.nome = dto.nome;
        aluno.grade = grade;

        return await AlunoEntity.save(aluno);
    }

    async historicoAluno(id?: number) {
        if (id) {
            return await AlunoEntity.findOne({
                where: {id: id},
                relations: ['grade', 'grade.materias', 'notas', 'notas.materia']
            })
        }

        return await AlunoEntity.find({relations: ['grade', 'grade.materias', 'notas', 'notas.materia']})
    }

    async melhoresAlunosPorScore(): Promise<ScoreAlunos[]> {
        const alunos = await AlunoEntity.find({relations: ['notas', 'notas.materia']});

        const resultadoAluno: any = alunos.map(aluno => {
            const melhoresNotas = aluno.notas
                .map(n => n.nota)
                .sort((a, b) => b - a)
                .slice(0, 3)

            if (melhoresNotas.length < 3 || melhoresNotas.some(nota => nota < 80))
                return null;

            const score = melhoresNotas.reduce((acc, nota) => acc + nota, 0) / melhoresNotas.length;

            return {
                aluno,
                melhoresNotas,
                score
            }
        }).filter(aluno => aluno !== null);

        resultadoAluno.sort((a, b) => b.score - a.score);
        return resultadoAluno;
    }

}

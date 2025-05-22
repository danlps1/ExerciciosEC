import {Injectable} from '@nestjs/common';
import {AlunoDto} from "../../dto/aluno.dto";
import {AlunoEntity} from "../../entity/aluno.entity";
import {GradeEntity} from "../../entity/grade.entity";

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

    async melhoresAlunosPorScore() {
        const alunos = await AlunoEntity.find({relations: ['notas']});

        const alunosPorScore= alunos
            .map(aluno => {
                const notas = aluno.notas;
                const soma = notas.reduce((acc, nota) => acc + nota.nota, 0);
                const media = soma / notas.length;
                return {aluno, media};
            })
            .sort((a, b) => b.media - a.media);

        return alunosPorScore;
    }

}

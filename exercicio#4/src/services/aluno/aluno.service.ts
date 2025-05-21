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
        if (!id) {
            return await AlunoEntity.findOne({
                where: {id: id},
                relations: ['grade', 'grade.materias']
            })
        }

        return await AlunoEntity.find({relations: ['grade', 'grade.materias']})
    }
}

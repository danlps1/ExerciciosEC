import {Injectable} from '@nestjs/common';
import {NotaDto} from "../../dto/nota.dto";
import {NotaEntity} from "../../entity/nota.entity";
import {AlunoEntity} from "../../entity/aluno.entity";
import {MateriaEntity} from "../../entity/materia.entity";

@Injectable()
export class NotaService {

    async lancarNotas(dto: NotaDto) {

        const aluno = await AlunoEntity.findOne({where: {id: dto.alunoId}});
        if (!aluno) throw new Error("Aluno não encontrado!");

        const materia = await MateriaEntity.findOne({where: {id: dto.materiaId}});
        if (!materia) throw new Error("Matéria não encontrada!");

        const notas = await NotaEntity.createQueryBuilder('nota')
            .where('nota.alunoId = :alunoId', {alunoId: dto.alunoId})
            .andWhere('nota.materiaId = :materiaId', {materiaId: dto.materiaId})
            .orderBy('nota.id', 'ASC')
            .getMany();


        let contador = 0;
        for (const n of notas) {
            if (n.nota >= 80) {
                contador++;
                if (contador === 3) {
                    throw new Error("Matéria já concluída! Não pode lançar mais notas.");
                }
            } else {
                contador = 0;
            }
        }


        const novaNota = new NotaEntity();
        novaNota.nota = dto.nota;
        novaNota.aluno = aluno;
        novaNota.materia = materia;


        const notasAtualizadas = [...notas, novaNota];

        contador = 0;
        for (const n of notasAtualizadas) {
            if (n.nota >= 80) {
                contador++;
                if (contador === 3) {
                    console.log("Matéria concluída!");
                    break;
                }
            } else {
                contador = 0;
            }
        }

        const notaSalva = await NotaEntity.save(novaNota);
        return notaSalva;
    }


}

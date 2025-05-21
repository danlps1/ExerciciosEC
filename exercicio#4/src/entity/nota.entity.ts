import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AlunoEntity} from "./aluno.entity";
import {MateriaEntity} from "./materia.entity";

@Entity('tb_notas')
export class NotaEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nota: number;

    @ManyToOne(() => AlunoEntity, aluno => aluno.notas)
    aluno: AlunoEntity;

    @ManyToOne(() => MateriaEntity, materia => materia.notas)
    materia: MateriaEntity;
}


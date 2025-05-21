import {BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {GradeEntity} from "./grade.entity";
import {NotaEntity} from "./nota.entity";

@Entity('tb_alunos')
export class AlunoEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(()=> GradeEntity, grade => grade.alunos)
    grade: GradeEntity;

    @OneToMany(()=> NotaEntity, nota => nota.aluno)
    notas: NotaEntity[];
}
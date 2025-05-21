import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {GradeEntity} from "./grade.entity";

@Entity('tb_alunos')
export class AlunoEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToOne(()=> GradeEntity, grade => grade.alunos)
    grade: GradeEntity;
}
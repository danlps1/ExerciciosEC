import {BaseEntity, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {AlunoEntity} from "./aluno.entity";
import {MateriaEntity} from "./materia.entity";

@Entity('tb_grade')
export class GradeEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(()=> AlunoEntity, aluno => aluno.grade)
    alunos: AlunoEntity[];

    @ManyToMany(()=> MateriaEntity, materia => materia.grades)
    @JoinTable()
    materias: MateriaEntity[];
}
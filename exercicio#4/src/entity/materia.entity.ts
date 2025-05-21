import {BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {GradeEntity} from "./grade.entity";
import {NotaEntity} from "./nota.entity";

@Entity('tb_materias')
export class MateriaEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToMany(()=> GradeEntity, grade => grade.materias)
    grades: GradeEntity[];

    @OneToMany(()=> NotaEntity, nota => nota.materia)
    notas: NotaEntity[];
}
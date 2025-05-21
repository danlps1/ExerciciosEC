import {BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {GradeEntity} from "./grade.entity";

@Entity('tb_materias')
export class MateriaEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @ManyToMany(()=> GradeEntity, grade => grade.materias)
    grades: GradeEntity[];
}
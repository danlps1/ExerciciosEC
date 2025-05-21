import { Injectable } from '@nestjs/common';
import {GradeDto} from "../../dto/grade.dto";
import {MateriaEntity} from "../../entity/materia.entity";
import {In} from "typeorm";
import {GradeEntity} from "../../entity/grade.entity";

@Injectable()
export class GradeService {

    async criarGrade(dto: GradeDto){
        if(dto.materiasId.length < 5)
            throw new Error("Uma grade deve ter no minimo 5 matérias!")

        const materias = await MateriaEntity.find({
            where: {id: In(dto.materiasId)}
        });

        const grade = new GradeEntity();
        grade.materias = materias;

        return await GradeEntity.save(grade);

    }
}

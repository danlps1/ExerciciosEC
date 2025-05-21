import { Module } from '@nestjs/common';
import {MateriaController} from "../../controllers/materia/materia.controller";
import {MateriaService} from "../../services/materia/materia.service";

@Module({
    controllers: [MateriaController],
    providers: [MateriaService]
})
export class MateriaModule {}

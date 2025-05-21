import {Body, Controller, Post} from '@nestjs/common';
import {MateriaService} from "../../services/materia/materia.service";
import {MateriaDto} from "../../dto/materia.dto";

@Controller('materia')
export class MateriaController {
    constructor(private readonly materiaService: MateriaService) {}

    @Post()
    async cadastrarMateria(@Body() dto: MateriaDto){
        return await this.materiaService.cadastrarMateria(dto);
    }
}

import { Injectable } from '@nestjs/common';
import { MateriaDto } from '../../dto/materia.dto';
import { MateriaEntity } from '../../entity/materia.entity';

@Injectable()
export class MateriaService {
  async cadastrarMateria(dto: MateriaDto) {
    const materia = new MateriaEntity();
    materia.nome = dto.nome;

    return await MateriaEntity.save(materia);
  }
}

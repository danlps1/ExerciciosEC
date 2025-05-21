import { Injectable } from '@nestjs/common';
import { MarcaDto } from 'src/dto/marca.dto';
import { MarcaEntity } from 'src/entity/marca.entity';

@Injectable()
export class MarcaService {
    
  async cadastrarMarca(dto: MarcaDto) {
    const marca = MarcaEntity.create({
      nome: dto.nome,
    });
    return await MarcaEntity.save(marca);
  }

  async buscarMarca(id: number) {
    return MarcaEntity.findOneBy({ id });
  }
}

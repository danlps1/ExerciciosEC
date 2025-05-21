import { Injectable } from '@nestjs/common';
import { VeiculoDto } from 'src/dto/veiculo.dto';
import { CategoriaEntity } from 'src/entity/categoria.entity';
import { MarcaEntity } from 'src/entity/marca.entity';
import { VeiculoEntity } from 'src/entity/veiculo.entity';

@Injectable()
export class VeiculoService {
  async cadastrarVeiculo(dto: VeiculoDto) {
    const marca = await MarcaEntity.findOneBy({ id: dto.marcaId });
    if (!marca) throw new Error('Marca não contrada!');

    const categoria = await CategoriaEntity.findOneBy({ id: dto.categoriaId });
    if (!categoria) throw new Error('Categoria não encontrada!');

    const veiculo = await VeiculoEntity.create({
      ...dto,
      marca: marca,
      categoria: categoria,
    });

    return await VeiculoEntity.save(veiculo);
  }

  async listarVeiculos() {
    return await VeiculoEntity.find();
  }

  async buscarVeiculo(id: number) {
    return await VeiculoEntity.findOneBy({ id: id });
  }

  async editarVeiculo(id: number, dto: VeiculoDto) {
    const veiculo = await VeiculoEntity.findOneBy({ id: id });
    if (!veiculo) throw new Error('Veiculo não contrada!');

    const marca = await MarcaEntity.findOneBy({ id: dto.marcaId });
    if (!marca) throw new Error('Marca não contrada!');

    const categoria = await CategoriaEntity.findOneBy({ id: dto.categoriaId });
    if (!categoria) throw new Error('Categoria não contrada!');

    const update = VeiculoEntity.merge(veiculo, {
      ...dto,
      marca: marca,
      categoria: categoria,
    });

    return await VeiculoEntity.save(update);
  }

  async deletarVeiculo(id: number) {
    return await VeiculoEntity.delete(id);
  }
}

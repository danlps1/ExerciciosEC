import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VeiculoDto } from 'src/dto/veiculo.dto';
import { VeiculoService } from 'src/services/veiculo/veiculo.service';

@Controller('veiculo')
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService) {}

  @Get()
  async listarVeiculos() {
    return await this.veiculoService.listarVeiculos();
  }

  @Get(':id')
  async buscarVeiculo(@Param('id') id: number) {
    return await this.veiculoService.buscarVeiculo(id);
  }

  @Post()
  async cadastrarVeiculo(@Body() veiculo: VeiculoDto) {
    return this.veiculoService.cadastrarVeiculo(veiculo);
  }

  @Put(':id')
  async editarVeiculo(@Param('id') id: number, @Body() veiculo: VeiculoDto) {
    return await this.veiculoService.editarVeiculo(id, veiculo);
  }

  @Delete(':id')
  async deletarVeiculo(@Param('id') id: number) {
    return await this.veiculoService.deletarVeiculo(id);
  }
}

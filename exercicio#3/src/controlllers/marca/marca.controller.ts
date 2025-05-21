import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MarcaDto } from 'src/dto/marca.dto';
import { MarcaService } from 'src/services/marca/marca.service';

@Controller('marca')
export class MarcaController {
  constructor(private readonly marcaService: MarcaService) {}

  @Get(':id')
  async buscarMarca(@Param('id') id: number) {
    return await this.marcaService.buscarMarca(id);
  }

  @Post()
  async cadastrarMarca(@Body() marca: MarcaDto) {
    return await this.marcaService.cadastrarMarca(marca);
  }
}

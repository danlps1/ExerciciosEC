import { Module } from '@nestjs/common';
import { VeiculoController } from 'src/controlllers/veiculo/veiculo.controller';
import { VeiculoService } from 'src/services/veiculo/veiculo.service';

@Module({
  controllers: [VeiculoController],
  providers: [VeiculoService],
})
export class VeiculoModule {}

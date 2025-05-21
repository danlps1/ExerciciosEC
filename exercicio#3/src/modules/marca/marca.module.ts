import { Module } from '@nestjs/common';
import { MarcaController } from 'src/controlllers/marca/marca.controller';
import { MarcaService } from 'src/services/marca/marca.service';

@Module({
  controllers: [MarcaController],
  providers: [MarcaService],
})
export class MarcaModule {}

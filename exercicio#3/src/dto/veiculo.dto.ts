import { IsNotEmpty } from 'class-validator';

export class VeiculoDto {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cor: string;

  @IsNotEmpty()
  ano: number;

  @IsNotEmpty()
  marcaId: number;

  @IsNotEmpty()
  categoriaId: number;
}

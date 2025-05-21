import { IsNotEmpty } from 'class-validator';

export class MarcaDto {
  @IsNotEmpty()
  nome: string;
}

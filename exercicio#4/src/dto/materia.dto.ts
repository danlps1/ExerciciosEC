import {IsNotEmpty} from "class-validator";

export class MateriaDto {
    @IsNotEmpty()
    nome: string;
}
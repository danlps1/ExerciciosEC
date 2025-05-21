import {IsNotEmpty} from "class-validator";

export class NotaDto {

    @IsNotEmpty()
    nota: number;

    @IsNotEmpty()
    materiaId: number;

    @IsNotEmpty()
    alunoId: number;
}
import {IsNotEmpty} from "class-validator";

export class AlunoDto {

    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    gradeId: number;
}
import {IsNotEmpty} from "class-validator";

export class GradeDto {
    @IsNotEmpty()
    materiasId: number[]
}
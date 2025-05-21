import { Module } from '@nestjs/common';
import {AlunoController} from "../../controllers/aluno/aluno.controller";
import {AlunoService} from "../../services/aluno/aluno.service";

@Module({
    controllers: [AlunoController],
    providers: [AlunoService]
})
export class AlunoModule {}

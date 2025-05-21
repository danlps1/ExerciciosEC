import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {AlunoService} from "../../services/aluno/aluno.service";
import {AlunoDto} from "../../dto/aluno.dto";

@Controller('aluno')
export class AlunoController {
    constructor(private readonly alunoService: AlunoService) {
    }

    @Get(':id')
    async historicoAluno(@Param('id') id: number) {
        return await this.alunoService.historicoAluno(id);
    }

    @Get()
    async historicoAlunos() {
        return await this.alunoService.historicoAluno();
    }

    @Post()
    async cadastrarAluno(@Body() dto: AlunoDto) {
        return await this.alunoService.cadastrarAluno(dto);
    }
}

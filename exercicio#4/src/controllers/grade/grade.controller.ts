import {Body, Controller, Post} from '@nestjs/common';
import {GradeService} from "../../services/grade/grade.service";
import {GradeDto} from "../../dto/grade.dto";

@Controller('grade')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @Post()
    async criarGrade(@Body() dto: GradeDto){
        return await this.gradeService.criarGrade(dto);
    }
}

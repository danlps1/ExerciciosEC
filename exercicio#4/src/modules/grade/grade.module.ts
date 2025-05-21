import { Module } from '@nestjs/common';
import {GradeController} from "../../controllers/grade/grade.controller";
import {GradeService} from "../../services/grade/grade.service";

@Module({
    controllers: [GradeController],
    providers: [GradeService]
})
export class GradeModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AlunoEntity} from "./entity/aluno.entity";
import {GradeEntity} from "./entity/grade.entity";
import {MateriaEntity} from "./entity/materia.entity";
import {AlunoModule} from "./modules/aluno/aluno.module";
import {GradeModule} from "./modules/grade/grade.module";
import {MateriaModule} from "./modules/materia/materia.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dbmysql',
      database: 'exercicio4',
      entities: [AlunoEntity, GradeEntity, MateriaEntity],
      synchronize: true,
    }), AlunoModule, GradeModule, MateriaModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

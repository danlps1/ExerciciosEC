import {AlunoEntity} from "../../entity/aluno.entity";

export type ScoreAlunos = {
    aluno: AlunoEntity;
    maioresNotas: number[];
    score: number;
};

import { Module } from '@nestjs/common';
import {NotaController} from "../../controllers/nota/nota.controller";
import {NotaService} from "../../services/nota/nota.service";

@Module({
    controllers: [NotaController],
    providers: [NotaService]
})
export class NotaModule {}

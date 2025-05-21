import {Body, Controller, Post} from '@nestjs/common';
import {NotaService} from "../../services/nota/nota.service";
import {NotaDto} from "../../dto/nota.dto";

@Controller('nota')
export class NotaController {
    constructor(private readonly notaService: NotaService) {
    }

    @Post()
    async lancarNotas(@Body() dto: NotaDto) {
        return await this.notaService.lancarNotas(dto);
    }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    async CreateAndUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        await this.jogadoresService.CreateAndUpdatePlayer(createPlayerDTO);
    }

    @Get()
    async getPlayer() : Promise<Jogador[]> {        
        return this.jogadoresService.getAllPlayers();
    }
}

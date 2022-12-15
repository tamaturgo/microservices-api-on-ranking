import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    async CreateAndUpdatePlayer(@Body() createPlayerDTO: CreatePlayerDTO) {
        await this.jogadoresService.CreateAndUpdatePlayer(createPlayerDTO);
    }

    @Get()
    async getPlayer(@Query('email') email: string): Promise<Jogador | Jogador[]> {
        if (email) {
            return await this.jogadoresService.getPlayerByEmail(email);
        } else {
            return await this.jogadoresService.getAllPlayers();
        }
    }

    @Delete()
    async deletePlayer(
        @Query("email") email:string,
    ): Promise<void> {
        await this.jogadoresService.deletePlayer(email);
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdatePlayerDTO } from './dtos/atualizar-jogador.dto';
import { CreatePlayerDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadorValidatorParamsPipe } from './pipes/jogadores-validator-params.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async CreatePlayer(@Body() createPlayerDTO: CreatePlayerDTO): Promise<Jogador> {
        return await this.jogadoresService.CreatePlayer(createPlayerDTO);
    }

    @Put(":_id")
    @UsePipes(ValidationPipe)
    async updatePlayer(
        @Body() updatePlayerDTO: UpdatePlayerDTO,
        @Param('_id', JogadorValidatorParamsPipe) _id: string
    ): Promise<void> {
        await this.jogadoresService.UpdatePlayer(updatePlayerDTO, _id);
    }

    @Get()
    async getAllPlayers(): Promise<Jogador[]> {
        return this.jogadoresService.getAllPlayers();
    }

    @Get('/:_id')
    async getPlayerById(@Param('_id', JogadorValidatorParamsPipe) _id: string): Promise<Jogador> {
        return this.jogadoresService.getPlayerById(_id);

    }
    @Delete('/:_id')
    async deletePlayer(
        @Param('_id', JogadorValidatorParamsPipe) _id: string,
    ): Promise<void> {
        await this.jogadoresService.deletePlayer(_id);
    }
}

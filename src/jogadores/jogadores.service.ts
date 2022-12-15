import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class JogadoresService {
    // Base de dados local e Logger
    private players: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name)


    // Métodos de controle para Jogadores
    async CreateAndUpdatePlayer(CreatePlayerDTO: CreatePlayerDTO): Promise<void> {
        const { email } = CreatePlayerDTO
        // Verifica se o jogador já existe
        const founded = this.players.find(jogador => jogador.email === email);

        if (founded) {
            await this.updatePlayer(CreatePlayerDTO, founded)
        } else {
            await this.createPlayer(CreatePlayerDTO);
        }
    }

    private async createPlayer(CreatePlayerDTO: CreatePlayerDTO): Promise<void> {
        const { name, phoneNumber, email } = CreatePlayerDTO;

        const player: Jogador = {
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: "A",
            rankingPosition: 1,
            photoUrl: "www.google.com.br/foto123.jpg"
        }
        this.logger.log(`CreatePlayerDTO:  ${JSON.stringify(player)}`)
        this.players.push(player);
    }

    private async updatePlayer(UpdatePlayerDTO: CreatePlayerDTO, foundedPlayer: Jogador): Promise<void> {
        const { name, phoneNumber } = UpdatePlayerDTO

        foundedPlayer.name = name;
        foundedPlayer.phoneNumber = phoneNumber
    }

    async getAllPlayers(): Promise<Jogador[]> {
        return await this.players;
    }

    async getPlayerByEmail(email: string): Promise<Jogador> {
        const founded: Jogador = this.players.find(p => p.email === email);

        if (!founded) {
            throw new NotFoundException(`O email ${email} não corresponde a um jogador`);
        }
        return founded;
    }

    async deletePlayer(email: string): Promise<void> {
        const founded = this.players.find(jogador => jogador.email === email);
        if (!founded) {
            throw new NotFoundException(`O email ${email} não corresponde a um jogador`);
        }
        this.players = this.players.filter(player => player.email !== founded.email);
    }
}


/*
!!!!!!!!
? PAREI NA AULA 15
!!!!!!! 
*/
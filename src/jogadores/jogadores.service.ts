import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
    constructor(@InjectModel('Jogadores') private readonly jogadorModel: Model<Jogador>) { }

    // Métodos de controle para Jogadores
    async CreateAndUpdatePlayer(CreatePlayerDTO: CreatePlayerDTO): Promise<void> {
        const { email } = CreatePlayerDTO
        const founded = await this.jogadorModel.findOne({ email }).exec();
        if (founded) {
            await this.updatePlayer(CreatePlayerDTO, founded)
        } else {
            await this.createPlayer(CreatePlayerDTO);
        }
    }

    private async createPlayer(CreatePlayerDTO: CreatePlayerDTO): Promise<Jogador> {
        const created = new this.jogadorModel(CreatePlayerDTO);
        return await created.save();
    }

    private async updatePlayer(UpdatePlayerDTO: CreatePlayerDTO, foundedPlayer: Jogador): Promise<Jogador> {
        return await this.jogadorModel.findOneAndUpdate(
            { email: foundedPlayer.email, },
            { $set: UpdatePlayerDTO }
        ).exec();
    }

    async getAllPlayers(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async getPlayerByEmail(email: string): Promise<Jogador> {
        return await this.jogadorModel.findOne({ email }).exec();
    }

    async deletePlayer(email: string): Promise<void> {
        return await this.jogadorModel.remove({ email }).exec();
    }
}



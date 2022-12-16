import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDTO } from './dtos/atualizar-jogador.dto';

@Injectable()
export class JogadoresService {
    constructor(@InjectModel('Jogadores') private readonly jogadorModel: Model<Jogador>) { }


    async CreatePlayer(CreatePlayerDTO: CreatePlayerDTO): Promise<Jogador> {
        const { email } = CreatePlayerDTO
        const founded = await this.jogadorModel.findOne({ email })
        if (founded) {
            throw new BadRequestException(`Jogador com e-mail: ${email} já está cadastrado.`)
        }
        const created = new this.jogadorModel(CreatePlayerDTO);
        return await created.save();
    }

    async UpdatePlayer(UpdatePlayerDTO: UpdatePlayerDTO, _id: string): Promise<Jogador> {
        const founded = await this.jogadorModel.findOne({ _id }).exec();

        if (!founded) {
            throw new NotFoundException(`jogador com o id (${_id}) não existe`);
        }
        return await this.jogadorModel.findOneAndUpdate(
            { _id },
            { $set: UpdatePlayerDTO }
        ).exec();
    }

    async getAllPlayers(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async getPlayerById(_id: string): Promise<Jogador> {
        const founded = await this.jogadorModel.findOne({ _id }).exec();
        if (!founded) {
            throw new NotFoundException(`jogador com o id (${_id}) não existe`);
        }
        return founded;
    }

    async deletePlayer(_id: string): Promise<any> {
        const founded = await this.jogadorModel.findOne({ _id }).exec();
        if (!founded) {
            throw new NotFoundException(`jogador com o id (${_id}) não existe`);
        }
        return await this.jogadorModel.deleteOne({ _id }).exec();
    }
}



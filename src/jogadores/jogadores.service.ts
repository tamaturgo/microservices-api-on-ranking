import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import {v4 as uuidv4} from 'uuid';

@Injectable()
export class JogadoresService {
    private players: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name)
    
    async CreateAndUpdatePlayer(CreatePlayerDTO: CreatePlayerDTO): Promise<void> {
        
        const {email} = CreatePlayerDTO
        // Verifica se o jogador já existe
        const founded = await this.players.find(jogador => jogador.email === email);

        if(founded){
            await this.updatePlayer(CreatePlayerDTO, founded)
        }else{
            await this.createPlayer(CreatePlayerDTO);
        }
    }
    
    
    private async createPlayer(CreatePlayerDTO: CreatePlayerDTO): Promise<void>  {
        const { name, phoneNumber, email } = CreatePlayerDTO;
        
        const player: Jogador = {
            _id : uuidv4(),
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
        const {name, phoneNumber} = UpdatePlayerDTO

        foundedPlayer.name =  name;
        foundedPlayer.phoneNumber = phoneNumber
    
    }
    
    
    async getAllPlayers():Promise<Jogador[]> {
        

        return await this.players;
    }
}

/*
!!!!!!!!
? PAREI NA AULA 15
*  link: https://www.udemy.com/course/construindo-um-backend-escalavel-com-nestjs-aws-e-pivotalws/learn/lecture/21049836#notes
!!!!!!! 
*/
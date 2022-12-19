import { Document } from "mongoose";
import { Jogador } from "src/jogadores/interfaces/jogador.interface";

export interface Categoria extends Document {

    readonly categoria: String,
    descricao: String,
    eventos: Array<Evento> ,
    jogadores: Array<Jogador>
}

export interface Evento {
    nome: String,
    operacao: String,
    valor: String
}
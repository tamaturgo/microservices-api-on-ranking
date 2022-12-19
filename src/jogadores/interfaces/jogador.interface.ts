import { Document } from "mongoose";

export interface Jogador extends Document {
    phoneNumber: string;
    readonly email: string;
    name: string;
    ranking: string;
    rankingPosition: number;
    photoUrl: string; 
}
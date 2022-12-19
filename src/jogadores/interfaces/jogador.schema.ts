import * as mongoose from "mongoose";

export const JogadorSchema = new mongoose.Schema({
    phoneNumber: String,
    email: {
        type: String,
        unique: true,
    },
    name: String,
    ranking: String,
    rankingPosition: Number,
    photoUrl: String
},
    {
        timestamps: true,
        collection: 'Jogadores'
    }
);


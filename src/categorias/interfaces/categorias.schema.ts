import * as mongoose from "mongoose";

export const CategoriaSchema = new mongoose.Schema(
    {
        categoria: {
            type: String,
            unique: true,
        },
        descricao: String,
        eventos: [{
            tipo: String,
            operacao: String,
            valor: String,
        }],
        jogadores: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Jogadores"
            }
        ]
    },
    {
        timestamps: true,
        collection: "Categorias"
    }
);

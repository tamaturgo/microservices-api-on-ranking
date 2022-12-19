import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogadoresService } from 'src/jogadores/jogadores.service';
import { updateCategoryDTO } from './dtos/atualiza-categoria.dto';
import { CreateCategoryDTO } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categorias.interface';

@Injectable()
export class CategoriasService {


    constructor(
        @InjectModel("Categorias") private readonly categoriaModel: Model<Categoria>,
        private readonly JogadoresService: JogadoresService
    ) { }

    async createCategory(categoryDTO: CreateCategoryDTO): Promise<Categoria> {
        const { categoria } = categoryDTO;
        const founded = await this.categoriaModel.findOne({ categoria }).exec();

        if (founded) {
            throw new BadRequestException(`A categoria (${categoria}) já existe`);
        }
        const categoriaCriada = new this.categoriaModel(categoryDTO);
        return await categoriaCriada.save();
    }

    async getAllCategories(): Promise<Array<Categoria>> {
        return this.categoriaModel.find().populate("jogadores").exec();
    }

    async getCategory(categoria: string): Promise<Categoria> {
        const founded = await this.categoriaModel.findOne({
            categoria
        }).exec();

        if (!founded) {
            throw new NotFoundException(`Categoria com o id (${categoria}) não existe`);
        }
        return founded;
    }

    async deleteCategory(_id: string): Promise<any> {
        return await this.categoriaModel.deleteOne({ _id }).exec();
    }


    async updateCategory(categoria: string, updateCategoryDTO: updateCategoryDTO): Promise<void> {
        const founded = await this.categoriaModel.findOne({ categoria }).exec();
        if (!founded) {
            throw new NotFoundException(`Categoria ${categoria} não existe`);
        }

        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: updateCategoryDTO }).exec();
    }

    async addPlayerToCategory(params: string[]): Promise<void> {
        const categoria = params['categoria']
        const id = params['idJogador']


        const founded = await this.categoriaModel.findOne({ categoria }).exec();
        const jogadorJaCadastrado = await this.categoriaModel.find({ categoria }).where('jogadores').in(id).exec();

        // ! Validações

        await this.JogadoresService.getPlayerById(id)
        if (!founded) {
            throw new NotFoundException(`A categoria ${id} não foi encontrada`)
        }

        if (jogadorJaCadastrado.length > 0) {
            throw new BadRequestException(`O Jogador ${id} já está cadastrado na categoria ${categoria}`)
        }

        // ? Atualização
        founded.jogadores.push(id);
        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: founded }).exec();
    }
}

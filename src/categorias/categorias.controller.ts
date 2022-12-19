import { Body, Controller, Post, Get, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoryDTO } from './dtos/criar-categoria.dto';
import { updateCategoryDTO } from './dtos/atualiza-categoria.dto';
import { Categoria } from './interfaces/categorias.interface';

@Controller('api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriaService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async createCategory(@Body() categoryDTO: CreateCategoryDTO): Promise<Categoria> {
        return await this.categoriaService.createCategory(categoryDTO);
    }

    @Get()
    async getAllCategories(): Promise<Array<Categoria>> {
        return await this.categoriaService.getAllCategories();
    }

    @Get("/:categoria")
    async getCategory(@Param("categoria") categoria: string): Promise<Categoria> {
        return await this.categoriaService.getCategory(categoria);
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)
    async updateCategory(@Param("categoria") categoria: string, @Body() categoryDTO: updateCategoryDTO): Promise<void> {
        return await this.categoriaService.updateCategory(categoria, categoryDTO);
    }

    @Post('/:categoria/jogadores/:idJogador')
    async addPlayerToCategory(
        @Param() params: string[],
    ): Promise<void> {
        await this.categoriaService.addPlayerToCategory(params);
    }
}

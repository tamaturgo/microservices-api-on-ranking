
import { IsString, IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator'
import { Evento } from '../interfaces/categorias.interface';

export class CreateCategoryDTO {
    @IsString()
    @IsNotEmpty()
    readonly categoria: string;

    @IsNotEmpty()
    @IsString()
    descricao: string;
    
    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>;
    
}
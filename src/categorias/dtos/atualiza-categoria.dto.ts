
import { IsString, IsNotEmpty, IsArray, ArrayMinSize, IsOptional } from 'class-validator'
import { Evento } from '../interfaces/categorias.interface';

export class updateCategoryDTO {
 
    @IsOptional()
    @IsString()
    descricao: string;
    
    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>;
    
}
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from 'src/jogadores/jogadores.module';
import { CategoriasController } from './categorias.controller';
import { CategoriasService } from './categorias.service';
import { CategoriaSchema } from './interfaces/categorias.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'Categorias',
      schema: CategoriaSchema
    }]),
    JogadoresModule
  ],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class CategoriasModule { }

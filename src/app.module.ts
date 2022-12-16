import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(
      "mongodb+srv://tamaturgo:diogeles19@cluster0.nsws3z1.mongodb.net/onranking?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [JogadoresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

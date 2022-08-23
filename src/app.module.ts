import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { PropostaComercialModule } from './proposta-comercial/proposta-comercial.module';

@Module({
  imports: [UsuarioModule, ClienteModule, PropostaComercialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

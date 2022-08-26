import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteModule } from './cliente/cliente.module';
import { PropostaComercialController } from './proposta-comercial/proposta-comercial.controller';
import { PropostaComercialModule } from './proposta-comercial/proposta-comercial.module';
import { UsuarioController } from './usuario/usuario.controller';
import { UsuarioModule } from './usuario/usuario.module';
import { AuditModule } from './audit/audit.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
    TypeOrmModule.forRoot(),
    ClienteModule,
    UsuarioModule,
    PropostaComercialModule,
    AuditModule,
  ],
  controllers: [
    ClienteController,
    UsuarioController,
    PropostaComercialController,
  ],
})
export class AppModule {}

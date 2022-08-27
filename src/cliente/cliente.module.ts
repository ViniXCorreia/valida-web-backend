import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './entities/cliente.entity';
import { ClienteRepoService } from './cliente.repository';
import { UsuarioRepoService } from 'src/usuario/usuario.repository';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [UsuarioModule, TypeOrmModule.forFeature([ClienteEntity])],
  controllers: [ClienteController],
  providers: [ClienteService, ClienteRepoService],
  exports: [ClienteService],
})
export class ClienteModule {}

import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClienteEntity } from './entities/cliente.entity';
import { ClienteRepoService } from './cliente.repository';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { AuditModule } from 'src/audit/audit.module';

@Module({
  imports: [
    AuditModule,
    UsuarioModule,
    TypeOrmModule.forFeature([ClienteEntity]),
  ],
  controllers: [ClienteController],
  providers: [ClienteService, ClienteRepoService],
  exports: [ClienteService],
})
export class ClienteModule {}

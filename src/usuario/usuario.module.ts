import { forwardRef, Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity';
import { UsuarioRepoService } from './usuario.repository';
import { AuditModule } from 'src/audit/audit.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuditModule,
    TypeOrmModule.forFeature([UsuarioEntity]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, UsuarioRepoService],
  exports: [UsuarioService],
})
export class UsuarioModule {}

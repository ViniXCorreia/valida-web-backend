import { Module } from '@nestjs/common';
import { PropostaComercialService } from './proposta-comercial.service';
import { PropostaComercialController } from './proposta-comercial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaComercialEntity } from './entities/proposta-comercial.entity';
import { PropostaComercialRepoService } from './proposta-comercial.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PropostaComercialEntity])],
  controllers: [PropostaComercialController],
  providers: [PropostaComercialService, PropostaComercialRepoService],
  exports: [PropostaComercialService],
})
export class PropostaComercialModule {}

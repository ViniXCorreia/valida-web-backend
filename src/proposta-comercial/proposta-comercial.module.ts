import { Module } from '@nestjs/common';
import { PropostaComercialService } from './proposta-comercial.service';
import { PropostaComercialController } from './proposta-comercial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropostaComercialEntity } from './entities/proposta-comercial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PropostaComercialEntity])],
  controllers: [PropostaComercialController],
  providers: [PropostaComercialService],
  exports: [PropostaComercialService],
})
export class PropostaComercialModule {}

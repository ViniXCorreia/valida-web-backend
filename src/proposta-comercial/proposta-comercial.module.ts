import { Module } from '@nestjs/common';
import { PropostaComercialService } from './proposta-comercial.service';
import { PropostaComercialController } from './proposta-comercial.controller';

@Module({
  controllers: [PropostaComercialController],
  providers: [PropostaComercialService]
})
export class PropostaComercialModule {}

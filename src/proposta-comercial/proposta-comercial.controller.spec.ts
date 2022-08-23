import { Test, TestingModule } from '@nestjs/testing';
import { PropostaComercialController } from './proposta-comercial.controller';
import { PropostaComercialService } from './proposta-comercial.service';

describe('PropostaComercialController', () => {
  let controller: PropostaComercialController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropostaComercialController],
      providers: [PropostaComercialService],
    }).compile();

    controller = module.get<PropostaComercialController>(PropostaComercialController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PropostaComercialService } from './proposta-comercial.service';

describe('PropostaComercialService', () => {
  let service: PropostaComercialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropostaComercialService],
    }).compile();

    service = module.get<PropostaComercialService>(PropostaComercialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

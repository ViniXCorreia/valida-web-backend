import { Injectable } from '@nestjs/common';
import { CreatePropostaComercialDto } from './dto/create-proposta-comercial.dto';
import { UpdatePropostaComercialDto } from './dto/update-proposta-comercial.dto';

@Injectable()
export class PropostaComercialService {
  create(createPropostaComercialDto: CreatePropostaComercialDto) {
    return 'This action adds a new propostaComercial';
  }

  findAll() {
    return `This action returns all propostaComercial`;
  }

  findOne(id: number) {
    return `This action returns a #${id} propostaComercial`;
  }

  update(id: number, updatePropostaComercialDto: UpdatePropostaComercialDto) {
    return `This action updates a #${id} propostaComercial`;
  }

  remove(id: number) {
    return `This action removes a #${id} propostaComercial`;
  }
}

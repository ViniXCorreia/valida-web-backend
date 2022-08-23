import { PartialType } from '@nestjs/mapped-types';
import { CreatePropostaComercialDto } from './create-proposta-comercial.dto';

export class UpdatePropostaComercialDto extends PartialType(CreatePropostaComercialDto) {}

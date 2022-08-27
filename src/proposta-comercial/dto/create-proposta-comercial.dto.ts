import { IsNumber, IsString } from 'class-validator';
import { ClienteEntity } from 'src/cliente/entities/cliente.entity';
import { ManyToOne } from 'typeorm';

export class CreatePropostaComercialDto {
  @IsString()
  description: string;

  @IsString()
  status: string = 'open';

  @IsNumber()
  clienteId: number;
}

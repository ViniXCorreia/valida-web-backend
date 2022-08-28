import { IsString } from 'class-validator';
import { ClienteEntity } from 'src/cliente/entities/cliente.entity';

export class CreatePropostaComercialDto {
  @IsString()
  description: string;

  @IsString()
  status: string = 'open';

  clienteId: ClienteEntity;
}

import { IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  name: string;

  @IsString()
  document: string;
}

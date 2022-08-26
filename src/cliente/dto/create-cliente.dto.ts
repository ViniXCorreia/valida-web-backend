import { IsEmail, IsString } from 'class-validator';

export class CreateClienteDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;
}

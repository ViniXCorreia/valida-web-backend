import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';

export class CreateClienteDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  responsiblePerson: string;

  internalResponsible?: UsuarioEntity;
}

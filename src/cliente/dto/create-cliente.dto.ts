import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UsuarioEntity } from 'src/usuario/entities/usuario.entity';

export class CreateClienteDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(11, { message: 'O documento tem que ter ao menos 11 caracteres' })
  @MaxLength(14, { message: 'O documento tem que ter no máximo 14 caracteres' })
  document: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  responsiblePerson: string;

  internalResponsible?: UsuarioEntity;
}

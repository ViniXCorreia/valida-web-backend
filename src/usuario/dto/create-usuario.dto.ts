import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UsuarioEnum } from '../enum/usuario.enum';

export class CreateUsuarioDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsEnum(UsuarioEnum)
  type: UsuarioEnum;
}

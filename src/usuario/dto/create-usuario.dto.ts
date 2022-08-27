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
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, {
    message: 'A senha tem que ter ao menos 8 caracteres',
  })
  @IsNotEmpty()
  password: string;

  @IsEnum(UsuarioEnum, { message: 'Tipo de usuário não encontrado!' })
  type: UsuarioEnum;
}

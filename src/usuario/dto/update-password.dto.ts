import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class updatePasswordDto {
  @IsString()
  @MinLength(8, {
    message: 'A senha tem que ter ao menos 8 caracteres',
  })
  @IsNotEmpty({ message: 'Campo senha é obrigatório!' })
  password: string;
}

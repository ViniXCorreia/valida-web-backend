import { IsString } from 'class-validator';

export class updatePasswordDto {
  @IsString()
  password: string;
}

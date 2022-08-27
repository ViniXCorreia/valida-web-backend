import { IsEmail } from 'class-validator';

export class FindByEmailDto {
  @IsEmail()
  email: string;
}

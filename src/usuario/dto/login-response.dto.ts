import { IsString } from 'class-validator';

export class LoginUserResponseDto {
  @IsString()
  readonly accessToken: string;
}

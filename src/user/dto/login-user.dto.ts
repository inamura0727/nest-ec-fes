import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  mailAddress: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

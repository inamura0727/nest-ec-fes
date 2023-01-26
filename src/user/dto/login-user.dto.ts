import { IsNotEmpty, IsString } from 'class-validator';
import { CIsNotEmpty } from 'src/decorators/standardClassValidators';

export class LoginUserDto {
  @IsString()
  @CIsNotEmpty({ propertyName: 'メールアドレスまたはパスワード' })
  mailAddress: string;

  @IsString()
  @CIsNotEmpty({ propertyName: 'メールアドレスまたはパスワード' })
  password: string;
}

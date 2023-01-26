import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CIsNotEmpty } from 'src/decorators/standardClassValidators';

export class RegisterUserDto {
  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  userName: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  zipcode: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  prefecture: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  city: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  houseNumber: string;

  @IsString()
  @IsOptional()
  buildingName: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  familyName: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  firstName: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  familyNameKana: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  firstNameKana: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  mailAddress: string;

  @IsString()
  @CIsNotEmpty({ propertyName: '必須項目は' })
  password: string;
}

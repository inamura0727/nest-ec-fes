import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateCartDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsInt()
  @IsNotEmpty()
  rentalPeriod: number;
}

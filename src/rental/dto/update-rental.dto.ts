import { IsNotEmpty } from 'class-validator';

export class UpdateRentalHistoryDto {
  @IsNotEmpty()
  rentalStart: Date | string;

  @IsNotEmpty()
  rentalEnd: Date | string;
}

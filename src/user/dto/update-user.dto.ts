import { IsNotEmpty } from 'class-validator';

export class UpdateUserFavoriteId {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  genre: number;
}

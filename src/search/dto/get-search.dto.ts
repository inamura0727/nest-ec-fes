import { IsOptional } from 'class-validator';

export class searchItemDto {
  @IsOptional()
  keyword: string | string[] | undefined;

  @IsOptional()
  genre: number;

  @IsOptional()
  page: number;

  @IsOptional()
  orderBy: string | string[];

  @IsOptional()
  order: string | string[];

  @IsOptional()
  take: number;
}

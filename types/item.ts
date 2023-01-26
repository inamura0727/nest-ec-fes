export class Item {
  itemId: number;
  fesName: string;
  artist: string;
  itemDetail: string;
  itemImage: string;
  // 形式: yyyy-MM-dd
  releaseDate: Date | string;
  // 単位：分
  playTime: number;
  twoDaysPrice: number;
  sevenDaysPrice: number;
  categories: number[];
  keywords: string[];
}

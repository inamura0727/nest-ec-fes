type RentalHistory = {
  displayPeriod?: string;
  rentalHistoryId: number;
  userId: number;
  itemId: number;
  itemName: string;
  price: number;
  itemImage: string;
  // 単位：日
  rentalPeriod: number;
  // 形式: yyyy-MM-dd hh:mm:ss
  payDate: Date | string;
  // 形式: yyyy-MM-dd hh:mm:ss
  rentalStart?: Date | string | null;
  // 形式: yyyy-MM-dd hh:mm:ss
  rentalEnd?: Date | string | null;
};

export type { RentalHistory };

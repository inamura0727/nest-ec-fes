import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async addRentalHistories(userId: number) {
    const result = await this.prisma.user.findUnique({
      where: {
        userId: userId,
      },
      select: {
        carts: {
          include: {
            items: true,
          },
        },
      },
    });

    // レンタル履歴追加用のデータを作成
    const carts = result.carts;
    const time = new Date();
    const addItem = carts.map((item) => {
      const tempItem = {
        userId: userId,
        itemId: item.itemId,
        itemName: `${item.items.artist} ${item.items.fesName}`,
        itemImage: item.items.itemImage,
        price: 0,
        rentalPeriod: item.rentalPeriod,
        payDate: time,
      };
      if (item.rentalPeriod === 2) {
        tempItem.price = item.items.twoDaysPrice;
      } else {
        tempItem.price = item.items.sevenDaysPrice;
      }
      return tempItem;
    });

    await this.prisma.$transaction([
      this.prisma.rentalHistory.createMany({
        data: addItem,
      }),
      this.prisma.cart.deleteMany({
        where: {
          userId: userId,
        },
      }),
    ]);
    // .catch(() => {
    //   message: 'error';
    // });
  }
}

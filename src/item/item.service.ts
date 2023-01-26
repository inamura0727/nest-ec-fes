import { Injectable } from '@nestjs/common';
import { Item } from 'types/item';
// なんでprisma/clientの型指定だとだめなの？
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  async preTop(
    favoritedId: number,
  ): Promise<{ newItems: Item[]; genreItems: Item[] }> {
    const item = await this.prisma.item.findMany({
      orderBy: {
        itemId: 'desc',
      },
      take: 10,
    });
    const newItems = item.map((item: Item) => ({
      ...item,
      releaseDate: item.releaseDate.toString(),
    }));
    const response = await this.prisma.item.findMany({
      where: {
        categories: {
          has: favoritedId,
        },
      },
      orderBy: {
        itemId: 'desc',
      },
      take: 10,
    });

    const genreItems = response.map((item) => ({
      ...item,
      releaseDate: item.releaseDate.toString(),
    }));

    return {
      newItems,
      genreItems,
    };
  }
}

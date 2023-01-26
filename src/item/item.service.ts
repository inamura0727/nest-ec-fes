import { Injectable } from '@nestjs/common';
import { Item } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  async preTop(take: number, favoriteId: number) {
    const item = await this.prisma.item.findMany({
      orderBy: {
        itemId: 'desc',
      },
      take: take,
    });
    const newItems = item.map((item) => ({
      ...item,
      releaseDate: item.releaseDate.toString(),
    }));
    const response = await this.prisma.item.findMany({
      where: {
        categories: {
          has: favoriteId,
        },
      },
      orderBy: {
        itemId: 'desc',
      },
      take: take,
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

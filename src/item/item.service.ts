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
    const newItems = await this.prisma.item.findMany({
      orderBy: {
        itemId: 'desc',
      },
      take: 10,
    });
    const genreItems = await this.prisma.item.findMany({
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

    return {
      newItems,
      genreItems,
    };
  }

  async selectGenre(id: number): Promise<Item[]> {
    const response = await this.prisma.item.findMany({
      where: {
        categories: {
          has: id,
        },
      },
      orderBy: {
        itemId: 'desc',
      },
      take: 10,
    });
    console.log(response);
    return response;
  }

  async getAllItems(): Promise<{ params: { id: string } }[]> {
    const response = await this.prisma.item.findMany();
    // console.log(response);
    const paths = response.map((item: { itemId: number }) => {
      return {
        params: {
          id: item.itemId.toString(),
        },
      };
    });
    return paths;
  }

  async getItemById(id: number): Promise<Item | null> {
    const response = await this.prisma.item.findUnique({
      where: {
        itemId: id,
      },
    });
    if (response === null) {
      return null;
    }
    return response;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { searchItemDto } from './dto/get-search.dto';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async selectItem(dto: searchItemDto) {
    const keyword = dto.keyword;
    const genre = dto.genre;
    const orderBy = dto.orderBy;
    const order = dto.order;
    const page = dto.page;
    const take = dto.take;
    let response;
    const skip = (page - 1) * take;
    let items;
    let count;
    if (typeof keyword !== 'string') {
      return;
    }
    if (typeof orderBy !== 'string') {
      return;
    }
    if (typeof order !== 'string') {
      return;
    }

    if (keyword.length === 0) {
      response = await this.prisma.item.findMany({
        where: {
          categories: {
            has: genre,
          },
        },
        orderBy: {
          [orderBy]: order,
        },
        skip: skip,
        take: take,
      });
    } else if (genre === 0) {
      response = await this.prisma.item.findMany({
        where: {
          OR: [
            {
              keywords: {
                has: keyword,
              },
            },
            {
              artist: {
                contains: keyword,
              },
            },
            {
              fesName: {
                contains: keyword,
              },
            },
          ],
        },
        orderBy: {
          [orderBy]: order,
        },
        skip: skip,
        take: take,
      });
    } else {
      response = await this.prisma.item.findMany({
        where: {
          OR: [
            {
              keywords: {
                has: keyword,
              },
            },
            {
              artist: {
                contains: keyword,
              },
            },
            {
              fesName: {
                contains: keyword,
              },
            },
          ],
          categories: {
            has: genre,
          },
        },
        orderBy: {
          [orderBy]: order,
        },
        skip: skip,
        take: take,
      });
    }

    if (keyword.length === 0) {
      count = await this.prisma.item.count({
        where: {
          categories: {
            has: genre,
          },
        },
      });
    } else if (genre === 0) {
      count = await this.prisma.item.count({
        where: {
          OR: [
            {
              keywords: {
                has: keyword,
              },
            },
            {
              artist: {
                contains: keyword,
              },
            },
            {
              fesName: {
                contains: keyword,
              },
            },
          ],
        },
      });
    } else {
      count = await this.prisma.item.count({
        where: {
          OR: [
            {
              keywords: {
                has: keyword,
              },
            },
            {
              artist: {
                contains: keyword,
              },
            },
            {
              fesName: {
                contains: keyword,
              },
            },
          ],
          categories: {
            has: genre,
          },
        },
      });
    }

    if (response)
      items = response.map((item) => ({
        itemId: item.itemId,
        itemImage: item.itemImage,
        artist: item.artist,
        fesName: item.fesName,
      }));

    if (keyword.length === 0) {
      count = await this.prisma.item.count({
        where: {
          categories: {
            has: genre,
          },
        },
      });
    } else if (genre === 0) {
      count = await this.prisma.item.count({
        where: {
          keywords: {
            has: keyword,
          },
        },
      });
    } else {
      count = await this.prisma.item.count({
        where: {
          categories: {
            has: genre,
          },
          keywords: {
            has: keyword,
          },
        },
      });
    }
    return { items: items, count: count };
  }
}

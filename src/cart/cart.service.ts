import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addCart(dto: CreateCartDto): Promise<{ isAdd: boolean }> {
    const data = await this.prisma.cart.create({
      data: {
        userId: dto.userId,
        itemId: dto.itemId,
        rentalPeriod: dto.rentalPeriod,
      },
    });
    if (data) return { isAdd: true };
  }

  getHello(): string {
    return 'Hello World!';
  }
}

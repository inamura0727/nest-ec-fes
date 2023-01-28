import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart } from 'types/cart';
import { Item } from 'types/item';
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

  async transmitCart(dto: CreateCartDto[]) {
    return await this.prisma.cart.createMany({
      data: dto,
    });
  }

  async deleteCart(cartId: number, userId: number): Promise<void> {
    const cartItem = await this.prisma.cart.findUnique({
      where: {
        cartId: cartId,
      },
    });
    if (!cartItem || cartItem.userId !== userId)
      throw new ForbiddenException('該当の商品はありません');
    await this.prisma.cart.delete({
      where: {
        cartId: cartId,
      },
    });
  }

  async selectCart(
    userId: number,
  ): Promise<{ carts: (Cart & { items: Item })[] }> {
    return await this.prisma.user.findUnique({
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
  }

  getHello(): string {
    return 'Hello World!';
  }
}

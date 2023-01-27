import { ForbiddenException, Injectable } from '@nestjs/common';
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

  getHello(): string {
    return 'Hello World!';
  }
}

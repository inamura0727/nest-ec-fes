import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { Cart } from 'types/cart';
import { Item } from 'types/item';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('getCartItem/:id')
  selectCart(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ carts: (Cart & { items: Item })[] }> {
    return this.cartService.selectCart(id);
  }

  @Post('add')
  addCart(@Body() dto: CreateCartDto): Promise<{ isAdd: boolean }> {
    return this.cartService.addCart(dto);
  }

  @Delete('delete/:cartId/:userId')
  deleteCart(
    @Param('cartId', ParseIntPipe) cartId: number,
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<void> {
    return this.cartService.deleteCart(cartId, userId);
  }

  @Get('delete/:cartId/:userId')
  getHello(): string {
    return this.cartService.getHello();
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addCart(@Body() dto: CreateCartDto) {
    return this.cartService.addCart(dto);
  }
  @Get('add')
  getHello(): string {
    return this.cartService.getHello();
  }
}

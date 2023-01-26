import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get(':id')
  getItems(@Param('id', ParseIntPipe) favoritedId: number) {
    return this.itemService.preTop(favoritedId);
  }
}

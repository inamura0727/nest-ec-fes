import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import { Item } from 'types/item';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('/pretop/:id')
  getItems(
    @Param('id', ParseIntPipe) favoritedId: number,
  ): Promise<{ newItems: Item[]; genreItems: Item[] }> {
    return this.itemService.preTop(favoritedId);
  }

  @Get('/selectGenre/:genre')
  selectGenre(@Param('genre', ParseIntPipe) genre: number): Promise<Item[]> {
    return this.itemService.selectGenre(genre);
  }

  @Get('/allItems')
  getAllItems() {
    return this.itemService.getAllItems();
  }

  @Get('/getItem/:id')
  getItemById(@Param('id', ParseIntPipe) id: number): Promise<Item | null> {
    return this.itemService.getItemById(id);
  }

  @Get('/selectNewItem')
  selectNewItem() {
    return this.itemService.selectNewItem();
  }
}

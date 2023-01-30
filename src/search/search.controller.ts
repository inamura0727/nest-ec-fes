import { Body, Controller, Post } from '@nestjs/common';
import { searchItemDto } from './dto/get-search.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('getItems')
  selectItems(@Body() dto: searchItemDto) {
    return this.searchService.selectItem(dto);
  }
}

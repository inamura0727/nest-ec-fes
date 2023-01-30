import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { UpdateRentalHistoryDto } from './dto/update-rental.dto';
import { RentalService } from './rental.service';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get(':id')
  selectRental(@Param('id', ParseIntPipe) id: number) {
    return this.rentalService.selectRental(id);
  }

  @Patch('update/:id')
  updateRentalHistory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRentalHistoryDto,
  ) {
    return this.rentalService.updateRentalHistory(id, dto);
  }
}

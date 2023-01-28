import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RentalService } from './rental.service';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Get(':id')
  selectRental(@Param('id', ParseIntPipe) id: number) {
    return this.rentalService.selectRental(id);
  }
}

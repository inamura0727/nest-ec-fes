import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(':id')
  addRentalHistory(@Param('id', ParseIntPipe) id: number) {
    return this.paymentService.addRentalHistories(id);
  }
}

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';

@Module({
  imports: [PrismaModule],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}

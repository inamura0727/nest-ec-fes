import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RentalHistory } from 'types/user';

@Injectable()
export class RentalService {
  constructor(private prisma: PrismaService) {}

  async selectRental(userId: number): Promise<RentalHistory[]> {
    return await this.prisma.rentalHistory.findMany({
      where: {
        userId: userId,
      },
    });
  }
}

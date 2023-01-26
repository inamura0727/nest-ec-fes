import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from './cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    CartModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ItemModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

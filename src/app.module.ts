import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { CartModule } from './cart/cart.module';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [UserModule, PrismaModule, CartModule],
  controllers: [AppController],
  providers: [AppService, TodoService],
})
export class AppModule {}

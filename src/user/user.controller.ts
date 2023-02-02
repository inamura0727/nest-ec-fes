import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserFavoriteId } from './dto/update-user.dto';
import { Msg } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUserInfo(@Param('id', ParseIntPipe) userId: number): Promise<User> {
    return this.userService.getUserInfo(userId);
  }

  @Post('register')
  register(@Body() dto: RegisterUserDto): Promise<Msg> {
    return this.userService.register(dto);
  }

  @Post('login')
  login(
    @Body() dto: LoginUserDto,
  ): Promise<{ result: boolean; message: string[]; user: User[] }> {
    return this.userService.login(dto);
  }

  @Patch('update')
  updateUser(@Body() dto: UpdateUserFavoriteId): Promise<User> {
    return this.userService.updateUser(dto);
  }
}

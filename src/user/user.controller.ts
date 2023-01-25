import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Msg } from './interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() dto: RegisterUserDto): Promise<Msg> {
    return this.userService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<User[]> {
    return this.userService.login(dto);
  }
}

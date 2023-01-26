import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Msg } from './interfaces/user.interface';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterUserDto): Promise<Msg> {
    try {
      await this.prisma.user.create({
        data: {
          userName: dto.userName,
          zipcode: dto.zipcode,
          prefecture: dto.prefecture,
          city: dto.city,
          houseNumber: dto.houseNumber,
          building: dto.buildingName,
          familyName: dto.familyName,
          firstName: dto.firstName,
          familyNameKana: dto.familyNameKana,
          firstNameKana: dto.firstNameKana,
          mailAddress: dto.mailAddress,
          password: dto.password,
          passwordTest: dto.passwordTest,
        },
      });
      return {
        message: 'ok',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('This email is already taken');
        }
      }
    }
  }

  async login(dto: LoginUserDto): Promise<User[]> {
    const user = await this.prisma.user.findMany({
      where: {
        mailAddress: dto.mailAddress,
        password: dto.password,
      },
    });
    return user;
  }
}

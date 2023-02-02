import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { Msg } from './interfaces/user.interface';
import { User } from '@prisma/client';
import { UpdateUserFavoriteId } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}

  async getUserInfo(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        userId,
      },
    });
  }

  async register(
    dto: RegisterUserDto,
  ): Promise<{ result: boolean; message: string }> {
    try {
      // 同じメールアドレスがある場合はfalseとメッセージを返す
      const item = await this.prisma.user.findMany({
        where: {
          mailAddress: dto.mailAddress,
        },
      });
      if (item[0]) {
        return {
          result: false,
          message: 'このメールアドレスはすでに登録済みです',
        };
      }

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
        result: true,
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

  async login(
    dto: LoginUserDto,
  ): Promise<{ result: boolean; message: string[]; user: User[] }> {
    const user = await this.prisma.user.findMany({
      where: {
        mailAddress: dto.mailAddress,
        password: dto.password,
      },
    });
    if (!user.length) {
      return {
        result: false,
        message: ['メールアドレスまたはパスワードが間違っています'],
        user: [],
      };
    } else {
      return {
        result: true,
        message: [],
        user: user,
      };
    }
  }

  async updateUser(dto: UpdateUserFavoriteId): Promise<User> {
    return await this.prisma.user.update({
      where: {
        userId: dto.id,
      },
      data: {
        favoriteId: dto.genre,
      },
    });
  }
}

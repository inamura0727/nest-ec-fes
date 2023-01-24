import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // CORS(Cross-Origin Resource Sharing) = オリジン間リソース共有
  // バックエンドへのサービスを許可するフロントエンドのドメインを設定
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000'],
  });
  // フロントエンドから受け取ったcookieを解析できる
  app.use(cookieParser());
  await app.listen(3005);
}
bootstrap();

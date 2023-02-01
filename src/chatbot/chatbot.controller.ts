import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { Chatbot } from '@prisma/client';
import { ChatbotService } from './chatbot.service';

@Controller('chatbot')
export class ChatbotController {
  constructor(private readonly chatService: ChatbotService) {}

  @Get()
  getChatList(): Promise<Chatbot[]> {
    return this.chatService.getChatList();
  }

  @Get('selectAnswer')
  selectAnswer(
    @Param('feelling', ParseIntPipe) feeling: number,
    @Param('who', ParseIntPipe) who: number,
  ) {
    return this.chatService.selectAnswer(feeling, who);
  }
}

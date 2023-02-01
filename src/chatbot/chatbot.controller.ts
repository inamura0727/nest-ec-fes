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

  @Get('selectAnswer/:feel/:anyone')
  selectAnswer(
    @Param('feel', ParseIntPipe) feel: number,
    @Param('anyone', ParseIntPipe) anyone: number,
  ) {
    return this.chatService.selectAnswer(feel, anyone);
  }
}

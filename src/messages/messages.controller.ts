import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private readonly service: MessagesService) {}

  /** Public — saves contact form submission */
  @Post()
  create(
    @Body() body: { name: string; email: string; message: string },
  ) {
    return this.service.create(body);
  }

  /** Admin — list all */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /** Admin — mark as read */
  @UseGuards(JwtAuthGuard)
  @Patch(':id/read')
  markRead(@Param('id') id: string) {
    return this.service.markRead(id);
  }

  /** Admin — delete */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

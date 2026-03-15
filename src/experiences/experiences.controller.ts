import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ExperiencesService } from './experiences.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly service: ExperiencesService) {}

  /** Public — frontend fetches this */
  @Get()
  findAll() {
    return this.service.findAll();
  }

  /** Admin */
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.service.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

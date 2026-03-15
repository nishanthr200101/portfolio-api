import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CloudinaryService } from '../common/cloudinary.service';
import { SettingsService } from '../settings/settings.service';

@Controller('resume')
export class ResumeController {
  constructor(
    private readonly cloudinary: CloudinaryService,
    private readonly settings: SettingsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  async upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    if (file.mimetype !== 'application/pdf')
      throw new BadRequestException('Only PDF files are allowed');

    const url = await this.cloudinary.uploadBuffer(file.buffer, 'nishanth-resume');
    return this.settings.setResumeUrl(url);
  }
}

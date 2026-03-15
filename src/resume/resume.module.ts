import { Module } from '@nestjs/common';
import { ResumeController } from './resume.controller';
import { CloudinaryService } from '../common/cloudinary.service';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [SettingsModule],
  controllers: [ResumeController],
  providers: [CloudinaryService],
})
export class ResumeModule {}

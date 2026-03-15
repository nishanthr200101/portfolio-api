import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('settings')
export class SettingsController {
  constructor(private readonly service: SettingsService) {}

  /** Public */
  @Get('public')
  getPublic() {
    return this.service.getPublic();
  }

  /** Admin */
  @UseGuards(JwtAuthGuard)
  @Patch('theme')
  setTheme(@Body('defaultTheme') theme: string) {
    return this.service.setTheme(theme);
  }
}

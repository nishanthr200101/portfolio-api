import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteSettings } from './site-settings.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(SiteSettings)
    private readonly repo: Repository<SiteSettings>,
  ) {}

  private async getOrCreate(): Promise<SiteSettings> {
    let row = await this.repo.findOne({ where: { id: 1 } });
    if (!row) {
      row = this.repo.create({ id: 1 });
      await this.repo.save(row);
    }
    return row;
  }

  async getPublic() {
    const row = await this.getOrCreate();
    return {
      defaultTheme: row.default_theme,
      resumeUrl: row.resume_url || null,
      resumeUploadedAt: row.resume_uploaded_at || null,
    };
  }

  async setTheme(theme: string) {
    const row = await this.getOrCreate();
    row.default_theme = theme;
    await this.repo.save(row);
    return { defaultTheme: row.default_theme };
  }

  async setResumeUrl(url: string) {
    const row = await this.getOrCreate();
    row.resume_url = url;
    row.resume_uploaded_at = new Date();
    await this.repo.save(row);
    return {
      resumeUrl: row.resume_url,
      resumeUploadedAt: row.resume_uploaded_at,
    };
  }
}

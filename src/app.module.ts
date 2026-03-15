import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { ResumeModule } from './resume/resume.module';
import { SettingsModule } from './settings/settings.module';
import { ExperiencesModule } from './experiences/experiences.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: { rejectUnauthorized: false },
        autoLoadEntities: true,
        synchronize: true, // auto-creates tables on first run
      }),
    }),
    AuthModule,
    MessagesModule,
    ResumeModule,
    SettingsModule,
    ExperiencesModule,
    ChatModule,
  ],
})
export class AppModule {}

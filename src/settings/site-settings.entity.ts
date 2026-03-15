import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity('site_settings')
export class SiteSettings {
  @PrimaryColumn({ default: 1 })
  id: number;

  @Column({ length: 20, default: 'orange' })
  default_theme: string;

  @Column({ type: 'text', nullable: true })
  resume_url: string;

  @Column({ type: 'timestamptz', nullable: true })
  resume_uploaded_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}

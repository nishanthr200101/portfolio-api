import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('admin_users')
export class AdminUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 255, unique: true })
  email: string;

  @Column('text')
  password_hash: string;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
}

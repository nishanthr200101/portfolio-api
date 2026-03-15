import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('contact_messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column('text')
  message: string;

  @Column({ default: false })
  is_read: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  submitted_at: Date;
}

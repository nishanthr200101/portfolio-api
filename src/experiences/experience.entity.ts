import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('experiences')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  company_name: string;

  /** Key name matching frontend asset map (e.g. "amphisoft", "hrlytics") */
  @Column()
  icon_key: string;

  @Column({ default: '#383E56' })
  icon_bg: string;

  @Column()
  date: string;

  /** Stored as JSON array of strings */
  @Column('simple-json')
  points: string[];

  @Column({ default: 0 })
  sort_order: number;
}

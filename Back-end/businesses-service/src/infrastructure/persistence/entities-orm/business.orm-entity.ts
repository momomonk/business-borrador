import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('businesses')
export class BusinessOrmEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column() name: string;
  @Column() slug: string;
  @CreateDateColumn({ type: 'timestamp' }) created_at: Date;
  @Column({ default: true }) is_active: boolean;
}
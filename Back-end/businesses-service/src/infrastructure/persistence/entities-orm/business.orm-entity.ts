import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('businesses')
export class BusinessOrmEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' }) id: string;
  @Column({name: 'is_active', default: true }) isActive: boolean;
  @CreateDateColumn({ type: 'timestamp', name: 'created_at' }) createdAt: Date;
  @Column({name: 'name'}) name: string;
  @Column({name: 'slug'}) slug: string;
}
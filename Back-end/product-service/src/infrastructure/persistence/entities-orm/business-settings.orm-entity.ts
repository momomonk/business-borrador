import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('categories')
export class BusinessSettingsOrmEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'id'}) id: string;
  @Column('uuid', {name: 'business_id'}) business_id: string;
  @Column() name: string;
  @Column('uuid', {name: 'parent_id'}) parent_id: string;
  @CreateDateColumn({name: 'created_at', type: 'timestamp' }) created_at: Date;
}
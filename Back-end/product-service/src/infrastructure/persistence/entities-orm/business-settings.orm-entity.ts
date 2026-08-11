import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('categories')
export class BusinessSettingsOrmEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'id'}) id: string;
  @Column('uuid', {name: 'business_id'}) businessId: string;
  @Column() name: string;
  @Column('uuid', {name: 'parent_id'}) parentId: string;
  @CreateDateColumn({name: 'created_at', type: 'timestamp' }) createdAt: Date;
}
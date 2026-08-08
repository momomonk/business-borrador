import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
export class BusinessOrmEntity {
 
  @PrimaryGeneratedColumn('uuid', {name: 'id'}) id: string;
  @Column('uuid', {name: 'business_id'}) business_id: string;
  @Column('uuid', {name: 'category_id'}) category_id: string;
  @Column() name: string;
  @Column() description: string;
  @Column() price: number;
  @Column() stock: number;
  @Column({ name: 'attributes', type: 'jsonb', nullable: true })
    attributes: Record<string, any>;
  @CreateDateColumn({name: 'created_at', type: 'timestamp' }) created_at: Date;
}
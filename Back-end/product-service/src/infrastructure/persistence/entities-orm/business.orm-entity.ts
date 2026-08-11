import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
export class BusinessOrmEntity {
 
  @PrimaryGeneratedColumn('uuid', {name: 'id'}) id: string;
  @Column('uuid', {name: 'business_id'}) businessId: string;
  @Column('uuid', {name: 'category_id'}) categoryId: string;
  @Column() stock: number;
  @Column({ name: 'attributes', type: 'jsonb', nullable: true })
    attributes: Record<string, any>;
  @CreateDateColumn({name: 'created_at', type: 'timestamp' }) createdAt: Date;
  @Column() name: string;
  @Column() description: string;
  @Column({ name: 'price', type: 'numeric', precision: 12, scale: 2 }) price: number;
}
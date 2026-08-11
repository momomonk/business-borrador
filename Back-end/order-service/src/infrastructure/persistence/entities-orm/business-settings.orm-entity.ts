import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('order_items')
export class BusinessSettingsOrmEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'id'}) id: string;
  @Column('uuid', {name: 'order_id'}) orderId: string;
  @Column('uuid', {name: 'product_id'}) productId: string;
  @Column() quantity: number;
  @Column({ name: 'price_at_purchase', type: 'numeric', precision: 12, scale: 2 }) priceAtPurchase: number;
}


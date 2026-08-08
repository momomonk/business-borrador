import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('order_items')
export class BusinessSettingsOrmEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'id'}) id: string;
  @Column('uuid', {name: 'order_id'}) order_id: string;
  @Column('uuid', {name: 'product_id'}) product_id: string;
  @Column() quantity: number;
  @Column() price_at_purchase: number;
}


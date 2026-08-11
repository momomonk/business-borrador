import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class BusinessOrmEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'id'}) id: string;
  @Column('uuid', {name: 'business_id'}) businessId: string;
  @Column('uuid', {name: 'customer_id'}) customerId: string;
  @CreateDateColumn({name: 'created_at', type: 'timestamp' }) createdAt: Date;
  @Column({ name: 'total_amount', type: 'numeric', precision: 12, scale: 2 }) totalAmount: number;
  @Column() status: boolean;
}

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('orders')
export class BusinessOrmEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'id'}) id: string;
  @Column('uuid', {name: 'business_id'}) business_id: string;
  @Column('uuid', {name: 'customer_id'}) customer_id: string;
  @Column() total_amount: number;
  @Column() status: boolean;
  @CreateDateColumn({name: 'created_at', type: 'timestamp' }) created_at: Date;
}

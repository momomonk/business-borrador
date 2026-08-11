import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('businesses_settings')
export class BusinessSettingsOrmEntity {
  @PrimaryGeneratedColumn('uuid', {name: 'business_settings_id'}) businessSettingsId: string;
  @Column({ name: 'theme_config', type: 'jsonb', nullable: true })
    themeConfig: Record<string, any>;
  @Column({ name: 'domain_settings', type: 'jsonb', nullable: true })
    domainSettings: Record<string, any>;
  @CreateDateColumn({name: 'update_at', type: 'timestamp' }) updatedAt: Date;
}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessSettingsRepository } from '../../../domain/repositories/business-settings.repository';
import { BusinessSettings } from '../../../domain/entities/business-settings.entity';
import { BusinessSettingsOrmEntity } from '../entities-orm/business-settings.orm-entity';
import { PaginatedResult } from '../../../common/pagination';

@Injectable()
export class BusinessSettingsRepositoryImpl implements BusinessSettingsRepository {
  constructor(@InjectRepository(BusinessSettingsOrmEntity) private repo: Repository<BusinessSettingsOrmEntity>) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<BusinessSettings>> {
    const [entities, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const list = entities.map(e => new BusinessSettings({
      businessSettingsId: e.businessSettingsId,
      domainSettings: e.domainSettings,
      themeConfig: e.themeConfig,
      updatedAt: e.updatedAt,
    }));
  
    return {
      list,
      meta: {
        totalItems: total,
        itemCount: list.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
      }
    };
  }

  async save(businessSettings: BusinessSettings): Promise<BusinessSettings> {
    const businessSettingsToSave = {
      businessSettingsId: businessSettings.businessSettingsId,
      domainSettings: businessSettings.domainSettings,
      themeConfig: businessSettings.themeConfig,
      updatedAt: businessSettings.updatedAt,
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new BusinessSettings({
      businessSettingsId: saved.businessSettingsId,
      domainSettings: saved.domainSettings,
      themeConfig: saved.themeConfig,
      updatedAt: saved.updatedAt,
    });
  }

  async findById(businessSettingsId: string): Promise<BusinessSettings | null> {
    const e = await this.repo.findOneBy({ businessSettingsId});
    return e ? new BusinessSettings({
      businessSettingsId: e.businessSettingsId,
      domainSettings: e.domainSettings,
      themeConfig: e.themeConfig,
      updatedAt: e.updatedAt,
    }) : null;
  }

  async updateThemeConfig(businessSettingsId: string, themeConfig: any): Promise<void> {
    await this.repo.update({ businessSettingsId }, { themeConfig });
  }

  async updatedomainSettings(businessSettingsId: string, domainSettings: any): Promise<void> {
    await this.repo.update({ businessSettingsId }, { domainSettings });
  }

  async update(businessSettingsId: string, business: BusinessSettings): Promise<void> {
    await this.repo.update({ businessSettingsId }, business);
  }

}
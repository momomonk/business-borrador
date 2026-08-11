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
      id: e.id,
      businessId: e.businessId,
      name: e.name, 
      parentId: e.parentId,
      createdAt: e.createdAt,
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
      id: businessSettings.id,
      businessId: businessSettings.businessId,
      name: businessSettings.name,
      parentId: businessSettings.parentId,
      createdAt: businessSettings.createdAt,
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new BusinessSettings({

      id: saved.id,
      businessId: saved.businessId, 
      name: saved.name, 
      parentId: saved.parentId,
      createdAt: saved.createdAt, 
    });
  }

  async findById(id: string): Promise<BusinessSettings | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new BusinessSettings({
      id: e.id,
      businessId: e.businessId, 
      name: e.name, 
      parentId: e.parentId,
      createdAt: e.createdAt,
    }) : null;
  }

  async updateBusinessId(id: string, businessId: string): Promise<void> {
    await this.repo.update({ id }, { businessId });
  }
  async updateName(id: string, name: string): Promise<void> {
    await this.repo.update({ id }, { name });
  }
  async updateParentId(id: string, parentId: string): Promise<void> {
    await this.repo.update({ id }, { parentId });
  }

  async update(id: string, business: BusinessSettings): Promise<void> {
    await this.repo.update({ id }, business);
  }

}
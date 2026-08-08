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
      business_id: e.business_id,
      name: e.name, 
      parent_id: e.parent_id,
      created_at: e.created_at,
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
      business_id: businessSettings.business_id,
      name: businessSettings.name,
      parent_id: businessSettings.parent_id,
      created_at: businessSettings.created_at,
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new BusinessSettings({

      id: saved.id,
      business_id: saved.business_id, 
      name: saved.name, 
      parent_id: saved.parent_id,
      created_at: saved.created_at, 
    });
  }

  async findById(id: string): Promise<BusinessSettings | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new BusinessSettings({
      id: e.id,
      business_id: e.business_id, 
      name: e.name, 
      parent_id: e.parent_id,
      created_at: e.created_at,
    }) : null;
  }

  async updateName(id: string, name: string): Promise<void> {
    await this.repo.update({ id }, { name });
  }

  async update(id: string, business: BusinessSettings): Promise<void> {
    await this.repo.update({ id }, business);
  }

}
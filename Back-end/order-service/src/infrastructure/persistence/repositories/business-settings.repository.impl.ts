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
      order_id: e.order_id,
      product_id: e.product_id,
      quantity: e.quantity,
      price_at_purchase: e.price_at_purchase,
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
      order_id: businessSettings.order_id,
      product_id: businessSettings.product_id,
      quantity: businessSettings.quantity,
      price_at_purchase: businessSettings.price_at_purchase,
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new BusinessSettings({

      id: saved.id,
      order_id: saved.order_id,
      product_id: saved.product_id,
      quantity: saved.quantity,
      price_at_purchase: saved.price_at_purchase,
    });
  }

  async findById(id: string): Promise<BusinessSettings | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new BusinessSettings({
      id: e.id,
      order_id: e.order_id,
      product_id: e.product_id,
      quantity: e.quantity,
      price_at_purchase: e.price_at_purchase,
    }) : null;
  }

  async updateQuantity(id: string, quantity: number): Promise<void> {
    await this.repo.update({ id }, { quantity });
  }

  async update(id: string, business: BusinessSettings): Promise<void> {
    await this.repo.update({ id }, business);
  }

}
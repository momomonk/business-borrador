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
      orderId: e.orderId,
      productId: e.productId,
      quantity: e.quantity,
      priceAtPurchase: e.priceAtPurchase,
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
      orderId: businessSettings.orderId,
      productId: businessSettings.productId,
      quantity: businessSettings.quantity,
      priceAtPurchase: businessSettings.priceAtPurchase,
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new BusinessSettings({

      id: saved.id,
      orderId: saved.orderId,
      productId: saved.productId,
      quantity: saved.quantity,
      priceAtPurchase: saved.priceAtPurchase,
    });
  }

  async findById(id: string): Promise<BusinessSettings | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new BusinessSettings({
      id: e.id,
      orderId: e.orderId,
      productId: e.productId,
      quantity: e.quantity,
      priceAtPurchase: e.priceAtPurchase,
    }) : null;
  }

  async changeOrderId(id: string, orderId: string): Promise<void> {
    await this.repo.update({ id }, { orderId });
  }
  async changeProductId(id: string, productId: string): Promise<void> {
    await this.repo.update({ id }, { productId });
  }
  async changeQuantity(id: string, quantity: number): Promise<void> {
    await this.repo.update({ id }, { quantity });
  }
  async changePriceAtPurchase(id: string, priceAtPurchase: number): Promise<void> {
    await this.repo.update({ id }, { priceAtPurchase });
  }

  async update(id: string, business: BusinessSettings): Promise<void> {
    await this.repo.update({ id }, business);
  }

}
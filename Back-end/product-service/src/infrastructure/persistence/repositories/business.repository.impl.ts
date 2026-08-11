import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessRepository } from '../../../domain/repositories/business.repository';
import { Business } from '../../../domain/entities/business.entity';
import { BusinessOrmEntity } from '../entities-orm/business.orm-entity';
import { PaginatedResult } from '../../../common/pagination';

@Injectable()
export class BusinessRepositoryImpl implements BusinessRepository {
  constructor(@InjectRepository(BusinessOrmEntity) private repo: Repository<BusinessOrmEntity>) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<Business>> {
    const [entities, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const list = entities.map(e => new Business({
      id: e.id,
      businessId: e.businessId,
      categoryId: e.categoryId,
      name: e.name,
      description: e.description,
      price: e.price,
      stock: e.stock,
      attributes: e.attributes,
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

  async save(business: Business): Promise<Business> {
    const businessSettingsToSave = {
      id: business.id,
      businessId: business.businessId,
      categoryId: business.categoryId,
      name: business.name,
      description: business.description,
      price: business.price,
      stock: business.stock,
      attributes: business.attributes,
      createdAt: business.createdAt, 
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new Business({
      id: saved.id,
      businessId: saved.businessId,
      categoryId: saved.categoryId,
      name: saved.name,
      description: saved.description,
      price: saved.price,
      stock: saved.stock,
      attributes: saved.attributes,
      createdAt: saved.createdAt, 
    });
  }

  async findById(id: string): Promise<Business | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new Business({
      id: e.id,
      businessId: e.businessId,
      categoryId: e.categoryId,
      name: e.name,
      description: e.description,
      price: e.price,
      stock: e.stock,
      attributes: e.attributes,
      createdAt: e.createdAt, 
    }) : null;
  }

  async updateBusinessId(id: string, businessId: string): Promise<void> {
    await this.repo.update(id, { businessId });
  }
  async updateCategoryId(id: string, categoryId: string): Promise<void> {
    await this.repo.update(id, { categoryId });
  }
  async updateStock(id: string, stock: number): Promise<void> {
    await this.repo.update(id, { stock });
  }
  async updateAttributes(id: string, attributes: Record<string, any>): Promise<void> {
    await this.repo.update(id, { attributes });
  }
  async updateName(id: string, name: string): Promise<void> {
    await this.repo.update(id, { name });
  }
  async updateDescription(id: string, description: string): Promise<void> {
    await this.repo.update(id, { description });
  }
  async updatePrice(id: string, price: number): Promise<void> {
    await this.repo.update(id, { price });
  }

  async update(id: string, business: Business): Promise<void> {
    await this.repo.update(id, business);
  }

}
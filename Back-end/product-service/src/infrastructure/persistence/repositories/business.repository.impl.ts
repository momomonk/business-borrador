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
      business_id: e.business_id,
      category_id: e.category_id,
      name: e.name,
      description: e.description,
      price: e.price,
      stock: e.stock,
      attributes: e.attributes,
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

  async save(business: Business): Promise<Business> {
    const businessSettingsToSave = {
      id: business.id,
      business_id: business.business_id,
      category_id: business.category_id,
      name: business.name,
      description: business.description,
      price: business.price,
      stock: business.stock,
      attributes: business.attributes,
      created_at: business.created_at, 
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new Business({
      id: saved.id,
      business_id: saved.business_id,
      category_id: saved.category_id,
      name: saved.name,
      description: saved.description,
      price: saved.price,
      stock: saved.stock,
      attributes: saved.attributes,
      created_at: saved.created_at, 
    });
  }

  async findById(id: string): Promise<Business | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new Business({
      id: e.id,
      business_id: e.business_id,
      category_id: e.category_id,
      name: e.name,
      description: e.description,
      price: e.price,
      stock: e.stock,
      attributes: e.attributes,
      created_at: e.created_at, 
    }) : null;
  }

  async updateName(id: string, name: string): Promise<void> {
    await this.repo.update(id, { name });
  }

  async update(id: string, business: Business): Promise<void> {
    await this.repo.update(id, business);
  }

}
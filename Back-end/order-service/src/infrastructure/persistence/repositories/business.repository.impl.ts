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
      customer_id: e.customer_id,
      total_amount: e.total_amount,
      status: e.status,
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
      customer_id: business.customer_id,
      total_amount: business.total_amount,
      status: business.status,
      created_at: business.created_at, 
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new Business({
      id: saved.id,
      business_id: saved.business_id,
      customer_id: saved.customer_id,
      total_amount: saved.total_amount,
      status: saved.status,
      created_at: saved.created_at, 
    });
  }

  async findById(id: string): Promise<Business | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new Business({
      id: e.id,
      business_id: e.business_id,
      customer_id: e.customer_id,
      total_amount: e.total_amount,
      status: e.status,
      created_at: e.created_at, 
    }) : null;
  }

  async updateStatus(id: string, status: boolean): Promise<void> {
    await this.repo.update(id, { status:status });
  }

  async updateTotalAmount(id: string, totalAmount: number): Promise<void> {
    await this.repo.update(id, { total_amount: totalAmount });
  }

  async update(id: string, business: Business): Promise<void> {
    await this.repo.update(id, business);
  }

}
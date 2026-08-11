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
      customerId: e.customerId,
      totalAmount: e.totalAmount,
      status: e.status,
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
      customerId: business.customerId,
      totalAmount: business.totalAmount,
      status: business.status,
      createdAt: business.createdAt, 
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new Business({
      id: saved.id,
      businessId: saved.businessId,
      customerId: saved.customerId,
      totalAmount: saved.totalAmount,
      status: saved.status,
      createdAt: saved.createdAt, 
    });
  }

  async findById(id: string): Promise<Business | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new Business({
      id: e.id,
      businessId: e.businessId,
      customerId: e.customerId,
      totalAmount: e.totalAmount,
      status: e.status,
      createdAt: e.createdAt, 
    }) : null;
  }

  async changeBusinessId(id: string, businessId: string): Promise<void> {
    await this.repo.update(id, { businessId: businessId });
  }
  async changeCustomerId(id: string, customerId: string): Promise<void> {
    await this.repo.update(id, { customerId: customerId });
  }
  async changeTotalAmount(id: string, totalAmount: number): Promise<void> {
    await this.repo.update(id, { totalAmount: totalAmount });
  }

  async changeStatus(id: string, status: boolean): Promise<void> {
    await this.repo.update(id, { status:status });
  }

  async update(id: string, business: Business): Promise<void> {
    await this.repo.update(id, business);
  }

}
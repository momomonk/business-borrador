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
      name: e.name,
      slug: e.slug,
      createdAt: e.createdAt,
      isActive: e.isActive,
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
      name: business.name,
      slug: business.slug,
      createdAt: business.createdAt,
      isActive: business.isActive,
    };
  
    const entity = this.repo.create(businessSettingsToSave);
    
    const saved = await this.repo.save(entity);
    
    return new Business({
      id: saved.id,
      name: saved.name,
      slug: saved.slug,
      createdAt: saved.createdAt,
      isActive: saved.isActive,
    });
  }

  async findById(id: string): Promise<Business | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new Business({
      id: e.id,
      name: e.name,
      slug: e.slug,
      createdAt: e.createdAt,
      isActive: e.isActive,
    }) : null;
  }

  async updateStatus(id: string, status: boolean): Promise<void> {
    await this.repo.update(id, { isActive: status });
  }

  async updateName(id: string, name: string): Promise<void> {
    await this.repo.update(id, { name });
  }

  async updateSlug(id: string, slug: string): Promise<void> {
    await this.repo.update(id, { slug });
  }
  
  async update(id: string, business: Business): Promise<void> {
    await this.repo.update(id, business);
  }

  async findBySlug(slug: string): Promise<boolean> {
    const exists = await this.repo.exists({
      where: {
        slug,
      },
    });
    return exists;
  }
}
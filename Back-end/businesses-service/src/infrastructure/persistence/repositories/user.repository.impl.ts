import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { User } from '../../../domain/entities/user.entity';
import { UserOrmEntity } from '../entities-orm/user.orm-entity';
import { PaginatedResult } from '../../../common/pagination';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectRepository(UserOrmEntity) private repo: Repository<UserOrmEntity>) {}

  async findAll(page: number, limit: number): Promise<PaginatedResult<User>> {
    const [entities, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  
    const list = entities.map(e => new User({
      id: e.id,
      name: e.name,
      slug: e.slug,
      created_at: e.created_at,
      is_active: e.is_active,
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

  async save(user: User): Promise<User> {
    const userToSave = {
      id: user.id,
      name: user.name,
      slug: user.slug,
      created_at: user.created_at,
      is_active: user.is_active,
    };
  
    const entity = this.repo.create(userToSave);
    
    const saved = await this.repo.save(entity);
    
    return new User({
      id: saved.id,
      name: saved.name,
      slug: saved.slug,
      created_at: saved.created_at,
      is_active: saved.is_active,
    });
  }

  async findById(id: string): Promise<User | null> {
    const e = await this.repo.findOneBy({ id });
    return e ? new User({
      id: e.id,
      name: e.name,
      slug: e.slug,
      created_at: e.created_at,
      is_active: e.is_active,
    }) : null;
  }

  async updateStatus(id: string, status: boolean): Promise<void> {
    await this.repo.update(id, { is_active: status });
  }

  async update(id: string, user: User): Promise<void> {
    await this.repo.update(id, user);
  }

  async findByEmail(slug: string): Promise<boolean> {
    const exists = await this.repo.exists({
      where: {
        slug,
      },
    });
    return exists;
  }
}
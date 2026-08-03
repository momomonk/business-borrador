import { User } from '../entities/business.entity';
import { PaginatedResult } from '../../common/pagination';

export interface UserRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<User>>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  updateStatus(id: string, status: boolean): Promise<void>;
  updateName(id: string, name: string): Promise<void>;
  findByEmail(slug: string): Promise<boolean>;
  update(id: string, user: User): Promise<void>;
}
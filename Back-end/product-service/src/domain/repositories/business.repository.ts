import { Business } from '../entities/business.entity';
import { PaginatedResult } from '../../common/pagination';

export interface BusinessRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<Business>>;
  save(user: Business): Promise<Business>;
  findById(id: string): Promise<Business | null>;
  updateBusinessId(id: string, business_id: string): Promise<void>;
  updateCategoryId(id: string, category_id: string): Promise<void>;
  updateStock(id: string, stock: number): Promise<void>;
  updateAttributes(id: string, attributes: Record<string, any>): Promise<void>;
  updateName(id: string, name: string): Promise<void>;
  updateDescription(id: string, description: string): Promise<void>;
  updatePrice(id: string, price: number): Promise<void>;
  update(id: string, business: Business): Promise<void>;
}
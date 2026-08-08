import { Business } from '../entities/business.entity';
import { PaginatedResult } from '../../common/pagination';

export interface BusinessRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<Business>>;
  save(user: Business): Promise<Business>;
  findById(id: string): Promise<Business | null>;
  updateStatus(id: string, status: boolean): Promise<void>;
  updateTotalAmount(id: string, totalAmount: number): Promise<void>;
  update(id: string, business: Business): Promise<void>;
}
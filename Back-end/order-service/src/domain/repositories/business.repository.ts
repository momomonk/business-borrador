import { Business } from '../entities/business.entity';
import { PaginatedResult } from '../../common/pagination';

export interface BusinessRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<Business>>;
  save(user: Business): Promise<Business>;
  findById(id: string): Promise<Business | null>;
  changeBusinessId(id: string, businessId: string): Promise<void>;
  changeCustomerId(id: string, customerId: string): Promise<void>;
  changeTotalAmount(id: string, totalAmount: number): Promise<void>;
  changeStatus(id: string, status: boolean): Promise<void>;
  update(id: string, business: Business): Promise<void>;
}
import { BusinessSettings } from '../entities/business-settings.entity';
import { PaginatedResult } from '../../common/pagination';

export interface BusinessSettingsRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<BusinessSettings>>;
  save(user: BusinessSettings): Promise<BusinessSettings>;
  findById(id: string): Promise<BusinessSettings | null>;
  updateQuantity(id: string, quantity: number): Promise<void>;
  update(id: string, business: BusinessSettings): Promise<void>;
}
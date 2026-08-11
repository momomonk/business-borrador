import { BusinessSettings } from '../entities/business-settings.entity';
import { PaginatedResult } from '../../common/pagination';

export interface BusinessSettingsRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<BusinessSettings>>;
  save(user: BusinessSettings): Promise<BusinessSettings>;
  findById(id: string): Promise<BusinessSettings | null>;
  updateBusinessId(id: string, businessId: string): Promise<void>;
  updateName(id: string, name: string): Promise<void>;
  updateParentId(id: string, parentId: string): Promise<void>;
  update(id: string, businessSettings: BusinessSettings): Promise<void>;
}
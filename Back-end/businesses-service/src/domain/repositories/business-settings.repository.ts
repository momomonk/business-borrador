import { BusinessSettings } from '../entities/business-settings.entity';
import { PaginatedResult } from '../../common/pagination';

export interface BusinessSettingsRepository {
  findAll(page: number, limit: number): Promise<PaginatedResult<BusinessSettings>>;
  save(user: BusinessSettings): Promise<BusinessSettings>;
  findById(businessSettingsId: string): Promise<BusinessSettings | null>;
  update(businessSettingsId: string, business: BusinessSettings): Promise<void>;
  updateThemeConfig(businessSettingsId: string, themeConfig: any): Promise<void>;
  updatedomainSettings(businessSettingsId: string, domainSettings: any): Promise<void>;
}
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BusinessSettingsRepository } from '../../domain/repositories/business-settings.repository';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class ChangeBusinessSettingsBusinessIdUseCase {
  constructor(@Inject('BusinessSettingsRepository') private readonly repo: BusinessSettingsRepository) {}

  async execute(id: string, businessId: string) {
    const business = await this.repo.findById(id);
    if (!business) throw new NotFoundException(ErrorMessages.BUSINESS_NOT_FOUND);

    await this.repo.updateBusinessId(id, businessId);
  }
}
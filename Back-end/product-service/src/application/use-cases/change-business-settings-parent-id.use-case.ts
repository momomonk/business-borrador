import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BusinessSettingsRepository } from '../../domain/repositories/business-settings.repository';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class ChangeBusinessSettingsParentIdUseCase {
  constructor(@Inject('BusinessSettingsRepository') private readonly repo: BusinessSettingsRepository) {}

  async execute(id: string, parentId: string) {
    const business = await this.repo.findById(id);
    if (!business) throw new NotFoundException(ErrorMessages.BUSINESS_NOT_FOUND);

    await this.repo.updateParentId(id, parentId);
  }
}
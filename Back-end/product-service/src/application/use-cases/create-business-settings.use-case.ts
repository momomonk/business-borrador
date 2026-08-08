import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BusinessSettingsRepository } from '../../domain/repositories/business-settings.repository';
import { BusinessSettings } from '../../domain/entities/business-settings.entity';
import { CreateBusinessSettingsDto } from '../../infrastructure/transport/http/dto/create-business-settings.dto';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class CreateBusinessSettingsUseCase {
  constructor(@Inject('BusinessSettingsRepository') private readonly repo: BusinessSettingsRepository) {}

  async execute(dto: CreateBusinessSettingsDto) {
    const businessSettingsAvailable = await this.repo.findById(dto.id);
    if(businessSettingsAvailable) throw new BadRequestException(ErrorMessages.PRODUCT_NOT_FOUND);
    const newBusinessSettings = new BusinessSettings({
      id: dto.id,
    });

    return await this.repo.save(newBusinessSettings);
  }
}
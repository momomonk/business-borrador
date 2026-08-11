import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BusinessSettingsRepository } from '../../domain/repositories/business-settings.repository';
import { BusinessSettings } from '../../domain/entities/business-settings.entity';
import { CreateBusinessSettingsDto } from '../../infrastructure/transport/http/dto/create-business-settings.dto';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class CreateBusinessSettingsUseCase {
  constructor(@Inject('BusinessSettingsRepository') private readonly repo: BusinessSettingsRepository) {}

  async execute(dto: CreateBusinessSettingsDto) {
    const newBusinessSettings = new BusinessSettings({
      themeConfig: dto.themeConfig,
      domainSettings: dto.domainSettings,
    });

    return await this.repo.save(newBusinessSettings);
  }
}
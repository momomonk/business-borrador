import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BusinessSettingsRepository } from '../../domain/repositories/business-settings.repository';
import { BusinessSettings } from '../../domain/entities/business-settings.entity';
import { UpdateBusinessSettingsDto } from '../../infrastructure/transport/http/dto/update-business-settings.dto';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class UpdateBusinessSettingsUseCase {
  constructor(@Inject('BusinessSettingsRepository') private readonly repo: BusinessSettingsRepository) {}

  async execute(dto: UpdateBusinessSettingsDto, id: string) {
    const businessAvailable = await this.repo.findById(id);
    if(!businessAvailable) throw new BadRequestException(ErrorMessages.BUSINESS_NOT_FOUND);

    const updateBusinessSettings = new BusinessSettings({
      id: dto.id,
    });

    return await this.repo.update(id, updateBusinessSettings);
  }
}
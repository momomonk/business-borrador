import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { BusinessRepository } from '../../domain/repositories/business.repository';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class ChangeBusinessAttributesUseCase {
  constructor(@Inject('BusinessRepository') private readonly repo: BusinessRepository) {}

  async execute(id: string, attributes: Record<string, any>) {
    const business = await this.repo.findById(id);
    if (!business) throw new NotFoundException(ErrorMessages.BUSINESS_NOT_FOUND);

    await this.repo.updateAttributes(id, attributes);
  }
}
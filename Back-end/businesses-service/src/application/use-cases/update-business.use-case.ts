import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BusinessRepository } from '../../domain/repositories/business.repository';
import { Business } from '../../domain/entities/business.entity';
import { UpdateBusinessDto } from '../../infrastructure/transport/http/dto/update-business.dto';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class UpdateBusinessUseCase {
  constructor(@Inject('BusinessRepository') private readonly repo: BusinessRepository) {}

  async execute(dto: UpdateBusinessDto, id: string) {
    const businessAvailable = await this.repo.findById(id);
    if(!businessAvailable) throw new BadRequestException(ErrorMessages.BUSINESS_NOT_FOUND);

    const slugAvailable = await this.repo.findBySlug(dto.slug);
    if(slugAvailable) throw new BadRequestException(ErrorMessages.SLUG_EXISTS);

    const updateBusiness = new Business({
      name: dto.name,
      slug: dto.slug,
    });

    return await this.repo.update(id, updateBusiness);
  }
}
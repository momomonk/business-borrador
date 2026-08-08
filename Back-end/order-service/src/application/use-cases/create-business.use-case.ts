import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BusinessRepository } from '../../domain/repositories/business.repository';
import { Business } from '../../domain/entities/business.entity';
import { CreateBusinessDto } from '../../infrastructure/transport/http/dto/create-business.dto';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class CreateBusinessUseCase {
  constructor(@Inject('BusinessRepository') private readonly repo: BusinessRepository) {}

  async execute(dto: CreateBusinessDto) {
    const businessAvailable = await this.repo.findById(dto.id);
    if(businessAvailable) throw new BadRequestException(ErrorMessages.CATEGORY_NOT_FOUND);
    const newBusiness = new Business({
      id: dto.id,
    });

    return await this.repo.save(newBusiness);
  }
}
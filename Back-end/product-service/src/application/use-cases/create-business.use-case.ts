import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { BusinessRepository } from '../../domain/repositories/business.repository';
import { Business } from '../../domain/entities/business.entity';
import { CreateBusinessDto } from '../../infrastructure/transport/http/dto/create-business.dto';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class CreateBusinessUseCase {
  constructor(@Inject('BusinessRepository') private readonly repo: BusinessRepository) {}

  async execute(dto: CreateBusinessDto) {
    const newBusiness = new Business({
      businessId: dto.businessId,
      categoryId: dto.categoryId,
      stock: dto.stock,
      attributes: dto.attributes,
      name: dto.name,
      description: dto.description,
      price: dto.price,
    });

    return await this.repo.save(newBusiness);
  }
}
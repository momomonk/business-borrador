import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/business.repository';
import { User } from '../../domain/entities/business.entity';
import { UpdateUserDto } from '../../infrastructure/transport/http/dto/update-business.dto';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class UpdateUserUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(dto: UpdateUserDto, id: string) {
    const userAvailable = await this.repo.findById(id);
    if(!userAvailable) throw new BadRequestException(ErrorMessages.USER_NOT_FOUND);

    const slugAvailable = await this.repo.findByEmail(dto.slug);
    if(slugAvailable) throw new BadRequestException(ErrorMessages.EMAIL_EXISTS);

    const updateUser = new User({
      name: dto.name,
      slug: dto.slug,
    });

    return await this.repo.update(id, updateUser);
  }
}
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../infrastructure/transport/http/dto/create-user.dto';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class CreateUserUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(dto: CreateUserDto) {
    const userAvailable = await this.repo.findByEmail(dto.slug);
    if(userAvailable) throw new BadRequestException(ErrorMessages.EMAIL_EXISTS);
    const newUser = new User({
      name: dto.name,
      slug: dto.slug,
    });

    return await this.repo.save(newUser);
  }
}
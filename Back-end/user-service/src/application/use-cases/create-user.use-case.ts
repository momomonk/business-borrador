import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { CreateUserDto } from '../../infrastructure/transport/http/dto/create-user.dto';
import { ErrorMessages } from '../../common/constants/error-messages';
import { BcryptService } from '../../infrastructure/persistence/services/bycrypt-password-hasher.services';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly repo: UserRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async execute(dto: CreateUserDto) {
    const userAvailable = await this.repo.findByEmail(dto.email);
    if(userAvailable) throw new BadRequestException(ErrorMessages.EMAIL_EXISTS);
    const hashedPassword = await this.bcryptService.hashPassword(dto.password);
    const newUser = new User({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      password: hashedPassword,
      cellphone: dto.cellphone,
    });

    return await this.repo.save(newUser);
  }
}
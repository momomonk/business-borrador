import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { ErrorMessages } from '../../common/constants/error-messages';

@Injectable()
export class ChangeUserStatusUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(id: string, status: boolean) {
    const user = await this.repo.findById(id);
    if (!user) throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);

    await this.repo.updateStatus(id, status);
  }
}
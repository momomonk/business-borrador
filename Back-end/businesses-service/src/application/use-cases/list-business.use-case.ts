import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/business.repository';

@Injectable()
export class ListUsersUseCase {
  constructor(@Inject('UserRepository') private readonly repo: UserRepository) {}

  async execute(page: number, limit: number) {
    return await this.repo.findAll(page, limit);
  }
}
import { Controller, Get, Post, Patch, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListUsersUseCase } from '../../../application/use-cases/list-users.use-case';
import { CreateUserUseCase } from '../../../application/use-cases/create-user.use-case';
import { ChangeUserStatusUseCase } from '../../../application/use-cases/change-user-status.use-case';
import { CreateUserDto } from './dto/create-user.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateStatusDto } from './dto/change-user-status.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly changeUserStatus: ChangeUserStatusUseCase,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true })) 
  async getAll(@Query() pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    return await this.listUsers.execute(page, limit);
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.createUser.execute(body);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return await this.changeUserStatus.execute(id, updateStatusDto.status);
  }
}
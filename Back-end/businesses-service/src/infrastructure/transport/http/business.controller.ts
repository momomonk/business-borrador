import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListUsersUseCase } from '../../../application/use-cases/list-business.use-case';
import { CreateUserUseCase } from '../../../application/use-cases/create-business.use-case';
import { ChangeUserStatusUseCase } from '../../../application/use-cases/change-business-status.use-case';
import { ChangeUserNameUseCase } from 'src/application/use-cases/change-business-name.use-case';
import { UpdateUserUseCase } from '../../../application/use-cases/update-business.use-case';
import { CreateUserDto } from './dto/create-business.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateStatusDto } from './dto/change-business-status.dto';
import { UpdateNameDto } from './dto/change-business-name.dto';
import { UpdateUserDto } from './dto/update-business.dto';
import { IdParamDto } from './dto/id-param.dto';

@Controller('businesses')
export class UserController {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly changeUserStatus: ChangeUserStatusUseCase,
    private readonly changeUserName: ChangeUserNameUseCase,
    private readonly updateUser: UpdateUserUseCase,
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

  @Patch(':id/name')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeName(
    @Param('id') id: string,
    @Body() updateNameDto: UpdateNameDto
  ) {
    return await this.changeUserName.execute(id, updateNameDto.name);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateUserDto
  ) {
    return await this.updateUser.execute(body, params.id);
  }
}
import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessUseCase } from '../../../application/use-cases/list-business.use-case';
import { CreateBusinessUseCase } from '../../../application/use-cases/create-business.use-case';
import { ChangeBusinessStatusUseCase } from '../../../application/use-cases/change-business-status.use-case';
import { ChangeBusinessNameUseCase } from 'src/application/use-cases/change-business-name.use-case';
import { UpdateBusinessUseCase } from '../../../application/use-cases/update-business.use-case';
import { CreateBusinessDto } from './dto/create-business.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateStatusDto } from './dto/change-business-status.dto';
import { UpdateNameDto } from './dto/change-business-name.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { IdParamDto } from './dto/id-param.dto';

@Controller('businesses')
export class BusinessController {
  constructor(
    private readonly listBusinesses: ListBusinessUseCase,
    private readonly createBusiness: CreateBusinessUseCase,
    private readonly changeBusinessStatus: ChangeBusinessStatusUseCase,
    private readonly changeBusinessName: ChangeBusinessNameUseCase,
    private readonly updateBusiness: UpdateBusinessUseCase,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true })) 
  async getAll(@Query() pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    return await this.listBusinesses.execute(page, limit);
  }

  @Post()
  async create(@Body() body: CreateBusinessDto) {
    return await this.createBusiness.execute(body);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto
  ) {
    return await this.changeBusinessStatus.execute(id, updateStatusDto.status);
  }

  @Patch(':id/name')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeName(
    @Param('id') id: string,
    @Body() updateNameDto: UpdateNameDto
  ) {
    return await this.changeBusinessName.execute(id, updateNameDto.name);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessDto
  ) {
    return await this.updateBusiness.execute(body, params.id);
  }
}
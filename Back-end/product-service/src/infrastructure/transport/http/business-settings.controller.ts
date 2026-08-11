import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessSettingsUseCase } from '../../../application/use-cases/list-business-settings.use-case';
import { CreateBusinessSettingsUseCase } from '../../../application/use-cases/create-business-settings.use-case';
import { ChangeBusinessSettingsNameUseCase } from 'src/application/use-cases/change-business-settings-name.use-case';
import { ChangeBusinessSettingsBusinessIdUseCase } from 'src/application/use-cases/change-business-settings-business-id.use-case';
import { ChangeBusinessSettingsParentIdUseCase } from 'src/application/use-cases/change-business-settings-parent-id.use-case';
import { UpdateBusinessSettingsUseCase } from '../../../application/use-cases/update-business-settings.use-case';
import { CreateBusinessSettingsDto } from './dto/create-business-settings.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto';
import { IdParamDto } from './dto/id-param.dto';
import { UpdateBusinessSettingsNameDto} from './dto/change-business-settings-name.dto';
import { UpdateBusinessSettingsParentIdDto } from './dto/change-business-settings-parent-id.dto';
import { UpdateBusinessSettingsBusinessIdDto } from './dto/change-business-settings-business-id.dto';

@Controller('categories')
export class BusinessSettingsController {
  constructor(
    private readonly listBusinessesSettings: ListBusinessSettingsUseCase,
    private readonly createBusinessSettings: CreateBusinessSettingsUseCase,
    private readonly changeBusinessSettingsName: ChangeBusinessSettingsNameUseCase,
    private readonly changeBusinessSettingsParentId: ChangeBusinessSettingsParentIdUseCase,
    private readonly changeBusinessSettingsBusinessId: ChangeBusinessSettingsBusinessIdUseCase,
    private readonly updateBusinessSettings: UpdateBusinessSettingsUseCase,
  ) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true })) 
  async getAll(@Query() pagination: PaginationDto) {
    const { page = 1, limit = 10 } = pagination;
    return await this.listBusinessesSettings.execute(page, limit);
  }

  @Post()
  async create(@Body() body: CreateBusinessSettingsDto) {
    return await this.createBusinessSettings.execute(body);
  }

  @Patch(':id/businessId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeBusinessId(
    @Param('id') id: string,
    @Body() updateBusinessIdDto: UpdateBusinessSettingsBusinessIdDto
  ) {
    return await this.changeBusinessSettingsBusinessId.execute(id, updateBusinessIdDto.businessId);
  }

  @Patch(':id/name')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeName(
    @Param('id') id: string,
    @Body() updateNameDto: UpdateBusinessSettingsNameDto
  ) {
    return await this.changeBusinessSettingsName.execute(id, updateNameDto.name);
  }
  
  @Patch(':id/parentId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeParentId(
    @Param('id') id: string,
    @Body() updateParentIdDto: UpdateBusinessSettingsParentIdDto
  ) {
    return await this.changeBusinessSettingsParentId.execute(id, updateParentIdDto.parentId);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessSettingsDto
  ) {
    return await this.updateBusinessSettings.execute(body, params.id);
  }
}
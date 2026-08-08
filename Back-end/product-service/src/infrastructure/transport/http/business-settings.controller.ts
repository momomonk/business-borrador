import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessSettingsUseCase } from '../../../application/use-cases/list-business-settings.use-case';
import { CreateBusinessSettingsUseCase } from '../../../application/use-cases/create-business-settings.use-case';
import { ChangeBusinessSettingsNameUseCase } from 'src/application/use-cases/change-business-settings-name.use-case';
import { UpdateBusinessSettingsUseCase } from '../../../application/use-cases/update-business-settings.use-case';
import { CreateBusinessSettingsDto } from './dto/create-business-settings.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto';
import { IdParamDto } from './dto/id-param.dto';
import { UpdateBusinessSettingsNameDto } from './dto/change-business-settings-name.dto';

@Controller('businessesSettings')
export class BusinessSettingsController {
  constructor(
    private readonly listBusinessesSettings: ListBusinessSettingsUseCase,
    private readonly createBusinessSettings: CreateBusinessSettingsUseCase,
    private readonly changeBusinessSettingsName: ChangeBusinessSettingsNameUseCase,
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

  @Patch(':id/name')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeName(
    @Param('id') id: string,
    @Body() updateNameDto: UpdateBusinessSettingsNameDto
  ) {
    return await this.changeBusinessSettingsName.execute(id, updateNameDto.name);
  }
  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessSettingsDto
  ) {
    return await this.updateBusinessSettings.execute(body, params.id);
  }
}
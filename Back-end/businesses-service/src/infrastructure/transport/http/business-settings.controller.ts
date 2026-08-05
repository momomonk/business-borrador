import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessSettingsUseCase } from '../../../application/use-cases/list-business-settings.use-case';
import { CreateBusinessSettingsUseCase } from '../../../application/use-cases/create-business-settings.use-case';
import { UpdateBusinessSettingsUseCase } from '../../../application/use-cases/update-business-settings.use-case';
import { CreateBusinessSettingsDto } from './dto/create-business-settings.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { IdParamDto } from './dto/id-param.dto';

@Controller('businessesSettings')
export class BusinessSettingsController {
  constructor(
    private readonly listBusinessesSettings: ListBusinessSettingsUseCase,
    private readonly createBusinessSettings: CreateBusinessSettingsUseCase,
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

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessDto
  ) {
    return await this.updateBusinessSettings.execute(body, params.id);
  }
}
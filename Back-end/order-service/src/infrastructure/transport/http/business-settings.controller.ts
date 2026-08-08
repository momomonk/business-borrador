import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessSettingsUseCase } from '../../../application/use-cases/list-business-settings.use-case';
import { CreateBusinessSettingsUseCase } from '../../../application/use-cases/create-business-settings.use-case';
import { ChangeBusinessSettingsQuantityUseCase } from 'src/application/use-cases/change-business-settings-quantity.use-case';
import { UpdateBusinessSettingsUseCase } from '../../../application/use-cases/update-business-settings.use-case';
import { PaginationDto } from './dto/pagination.dto';
import { IdParamDto } from './dto/id-param.dto';
import { CreateBusinessSettingsDto } from './dto/create-business-settings.dto';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto';
import { UpdateBusinessSettingsQuantityDto } from './dto/change-business-settings-quantity.dto';

@Controller('businessesSettings')
export class BusinessSettingsController {
  constructor(
    private readonly listBusinessesSettings: ListBusinessSettingsUseCase,
    private readonly createBusinessSettings: CreateBusinessSettingsUseCase,
    private readonly changeBusinessSettingsQuantity: ChangeBusinessSettingsQuantityUseCase,
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

  @Patch(':id/quantity')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeQuantity(
    @Param('id') id: string,
    @Body() updateQuantityDto: UpdateBusinessSettingsQuantityDto
  ) {
    return await this.changeBusinessSettingsQuantity.execute(id, updateQuantityDto.quantity);
  }
  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessSettingsDto
  ) {
    return await this.updateBusinessSettings.execute(body, params.id);
  }
}
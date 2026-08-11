import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessSettingsUseCase } from '../../../application/use-cases/list-business-settings.use-case';
import { CreateBusinessSettingsUseCase } from '../../../application/use-cases/create-business-settings.use-case';
import { ChangeBusinessSettingsOrderIdUseCase } from 'src/application/use-cases/change-business-settings-order-id.use-case';
import { ChangeBusinessSettingsProductIdUseCase } from 'src/application/use-cases/change-business-settings-product-id.use-case';
import { ChangeBusinessSettingsQuantityUseCase } from 'src/application/use-cases/change-business-settings-quantity.use-case';
import { ChangeBusinessSettingsPriceAtPurchaseUseCase } from 'src/application/use-cases/change-business-settings-price-at-purchase.use-case';
import { UpdateBusinessSettingsUseCase } from '../../../application/use-cases/update-business-settings.use-case';
import { PaginationDto } from './dto/pagination.dto';
import { IdParamDto } from './dto/id-param.dto';
import { CreateBusinessSettingsDto } from './dto/create-business-settings.dto';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto';
import { ChangeBusinessSettingsOrderIdDto } from './dto/change-business-settings-order-id.dto';
import { ChangeBusinessSettingsProductIdDto } from './dto/change-business-settings-product-id.dto';
import { ChangeBusinessSettingsQuantityDto } from './dto/change-business-settings-quantity.dto';
import { ChangeBusinessSettingsPriceAtPurchaseDto } from './dto/change-business-settings-price-at-purchase.dto';

@Controller('order_details')
export class BusinessSettingsController {
  constructor(
    private readonly listBusinessesSettings: ListBusinessSettingsUseCase,
    private readonly createBusinessSettings: CreateBusinessSettingsUseCase,
    private readonly changeBusinessSettingsQuantity: ChangeBusinessSettingsQuantityUseCase,
    private readonly changeBusinessSettingsOrderId: ChangeBusinessSettingsOrderIdUseCase,
    private readonly changeBusinessSettingsProductId: ChangeBusinessSettingsProductIdUseCase,
    private readonly changeBusinessSettingsPriceAtPurchase: ChangeBusinessSettingsPriceAtPurchaseUseCase,
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
    @Body() changeBusinessSettingsQuantityDto: ChangeBusinessSettingsQuantityDto
  ) {
    return await this.changeBusinessSettingsQuantity.execute(id, changeBusinessSettingsQuantityDto.quantity);
  }

  @Patch(':id/orderId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeOrderId(
    @Param('id') id: string,
    @Body() changeBusinessSettingsOrderIdDto: ChangeBusinessSettingsOrderIdDto
  ) {
    return await this.changeBusinessSettingsOrderId.execute(id, changeBusinessSettingsOrderIdDto.orderId);
  }

  @Patch(':id/productId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeProductId(
    @Param('id') id: string,
    @Body() changeBusinessSettingsProductIdDto: ChangeBusinessSettingsProductIdDto
  ) {
    return await this.changeBusinessSettingsProductId.execute(id, changeBusinessSettingsProductIdDto.productId);
  }

  @Patch(':id/priceAtPurchase')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changePriceAtPurchase(
    @Param('id') id: string,
    @Body() changeBusinessSettingsPriceAtPurchaseDto: ChangeBusinessSettingsPriceAtPurchaseDto
  ) {
    return await this.changeBusinessSettingsPriceAtPurchase.execute(id, changeBusinessSettingsPriceAtPurchaseDto.priceAtPurchase);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessSettingsDto
  ) {
    return await this.updateBusinessSettings.execute(body, params.id);
  }
}
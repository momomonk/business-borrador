import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessUseCase } from '../../../application/use-cases/list-business.use-case';
import { CreateBusinessUseCase } from '../../../application/use-cases/create-business.use-case';
import { ChangeBusinessBusinessIdUseCase } from 'src/application/use-cases/change-business-business-id.use-case';
import { ChangeBusinessCategoryIdUseCase } from 'src/application/use-cases/change-business-category-id.use-case';
import { ChangeBusinessStockUseCase } from 'src/application/use-cases/change-business-stock.use-case';
import { ChangeBusinessAttributesUseCase } from 'src/application/use-cases/change-business-attributes.use-case';
import { ChangeBusinessNameUseCase } from 'src/application/use-cases/change-business-name.use-case';
import { ChangeBusinessDescriptionUseCase } from 'src/application/use-cases/change-business-description.use-case';
import { ChangeBusinessPriceUseCase } from 'src/application/use-cases/change-business-price.use-case';
import { UpdateBusinessUseCase } from '../../../application/use-cases/update-business.use-case';
import { CreateBusinessDto } from './dto/create-business.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBusinessBusinessIdDto } from './dto/change-business-business-id.dto';
import { UpdateBusinessCategoryIdDto } from './dto/change-business-category-id.dto';
import { UpdateBusinessStockDto } from './dto/change-business-stock.dto';
import { UpdateBusinessAttributesDto } from './dto/change-business-attributes.dto';
import { UpdateBusinessNameDto } from './dto/change-business-name.dto';
import { UpdateBusinessDescriptionDto } from './dto/change-business-description.dto';
import { UpdateBusinessPriceDto } from './dto/change-business-price.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { IdParamDto } from './dto/id-param.dto';

@Controller('products')
export class BusinessController {
  constructor(
    private readonly listBusinesses: ListBusinessUseCase,
    private readonly createBusiness: CreateBusinessUseCase,
    private readonly changeBusinessBusinessId: ChangeBusinessBusinessIdUseCase,
    private readonly changeBusinessCategoryId: ChangeBusinessCategoryIdUseCase,
    private readonly changeBusinessStock: ChangeBusinessStockUseCase,
    private readonly changeBusinessAttributes: ChangeBusinessAttributesUseCase,
    private readonly changeBusinessName: ChangeBusinessNameUseCase,
    private readonly changeBusinessDescription: ChangeBusinessDescriptionUseCase,
    private readonly changeBusinessPrice: ChangeBusinessPriceUseCase,
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

  @Patch(':id/businessId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeBusinessId(
    @Param('id') id: string,
    @Body() updateBusinessIdDto: UpdateBusinessBusinessIdDto
  ) {
    return await this.changeBusinessBusinessId.execute(id, updateBusinessIdDto.businessId);
  }

  @Patch(':id/categoryId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeCategoryId(
    @Param('id') id: string,
    @Body() updateCategoryIdDto: UpdateBusinessCategoryIdDto
  ) {
    return await this.changeBusinessCategoryId.execute(id, updateCategoryIdDto.categoryId);
  }
  @Patch(':id/stock')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeStock(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateBusinessStockDto
  ) {
    return await this.changeBusinessStock.execute(id, updateStockDto.stock);
  }
  @Patch(':id/attributes')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeAttributes(
    @Param('id') id: string,
    @Body() updateAttributesDto: UpdateBusinessAttributesDto
  ) {
    return await this.changeBusinessAttributes.execute(id, updateAttributesDto.attributes);
  }
  @Patch(':id/name')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeName(
    @Param('id') id: string,
    @Body() updateNameDto: UpdateBusinessNameDto
  ) {
    return await this.changeBusinessName.execute(id, updateNameDto.name);
  }
  @Patch(':id/description')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeDescription(
    @Param('id') id: string,
    @Body() updateDescriptionDto: UpdateBusinessDescriptionDto
  ) {
    return await this.changeBusinessDescription.execute(id, updateDescriptionDto.description);
  }
  @Patch(':id/price')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changePrice(
    @Param('id') id: string,
    @Body() updatePriceDto: UpdateBusinessPriceDto
  ) {
    return await this.changeBusinessPrice.execute(id, updatePriceDto.price);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessDto
  ) {
    return await this.updateBusiness.execute(body, params.id);
  }
}
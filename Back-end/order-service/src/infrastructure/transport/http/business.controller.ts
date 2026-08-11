import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessUseCase } from '../../../application/use-cases/list-business.use-case';
import { CreateBusinessUseCase } from '../../../application/use-cases/create-business.use-case';
import { ChangeBusinessBusinessIdUseCase } from 'src/application/use-cases/change-business-business-id.use-case';
import { ChangeBusinessCustomerIdUseCase } from 'src/application/use-cases/change-business-customer-id.use-case';
import { ChangeBusinessTotalAmountUseCase } from 'src/application/use-cases/change-business-total-amount.use-case';
import { ChangeBusinessStatusUseCase } from 'src/application/use-cases/change-business-status.use-case';
import { UpdateBusinessUseCase } from '../../../application/use-cases/update-business.use-case';
import { CreateBusinessDto } from './dto/create-business.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ChangeBusinessBusinessIdDto } from './dto/change-business-business-id.dto';
import { ChangeBusinessCustomerIdDto } from './dto/change-business-customer-id.dto';
import { ChangeBusinessTotalAmountDto } from './dto/change-business-total-amount.dto';
import { ChangeBusinessStatusDto } from './dto/change-business-status.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { IdParamDto } from './dto/id-param.dto';

@Controller('orders')
export class BusinessController {
  constructor(
    private readonly listBusinesses: ListBusinessUseCase,
    private readonly createBusiness: CreateBusinessUseCase,
    private readonly changeBusinessBusinessId: ChangeBusinessBusinessIdUseCase,
    private readonly changeBusinessCustomerId: ChangeBusinessCustomerIdUseCase,
    private readonly changeBusinessTotalAmount: ChangeBusinessTotalAmountUseCase,
    private readonly changeBusinessStatus: ChangeBusinessStatusUseCase,
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
    @Body() changeBusinessBusinessIdDto: ChangeBusinessBusinessIdDto
  ) {
    return await this.changeBusinessBusinessId.execute(id, changeBusinessBusinessIdDto.businessId);
  }

  @Patch(':id/customerId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeCustomerId(
    @Param('id') id: string,
    @Body() changeBusinessCustomerIdDto: ChangeBusinessCustomerIdDto
  ) {
    return await this.changeBusinessCustomerId.execute(id, changeBusinessCustomerIdDto.customerId);
  }

  @Patch(':id/totalAmount')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeTotalAmount(
    @Param('id') id: string,
    @Body() changeBusinessTotalAmountDto: ChangeBusinessTotalAmountDto
  ) {
    return await this.changeBusinessTotalAmount.execute(id, changeBusinessTotalAmountDto.totalAmount);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeStatus(
    @Param('id') id: string,
    @Body() changeBusinessStatusDto: ChangeBusinessStatusDto
  ) {
    return await this.changeBusinessStatus.execute(id, changeBusinessStatusDto.status);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessDto
  ) {
    return await this.updateBusiness.execute(body, params.id);
  }
}
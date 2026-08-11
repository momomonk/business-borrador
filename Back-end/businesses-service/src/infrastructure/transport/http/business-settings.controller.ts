import { Controller, Get, Post, Patch, Put, Param, Body, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ListBusinessSettingsUseCase } from '../../../application/use-cases/list-business-settings.use-case';
import { ChangeBusinessSettingsDomainSettingsUseCase } from '../../../application/use-cases/change-business-settings-domain-settings.use-case';
import { ChangeBusinessSettingsThemeConfigUseCase} from '../../../application/use-cases/change-business-settings-theme-config.use-case';
import { CreateBusinessSettingsUseCase } from '../../../application/use-cases/create-business-settings.use-case';
import { UpdateBusinessSettingsUseCase } from '../../../application/use-cases/update-business-settings.use-case';
import { CreateBusinessSettingsDto } from './dto/create-business-settings.dto';
import { PaginationDto } from './dto/pagination.dto';
import { UpdateBusinessSettingsDto } from './dto/update-business-settings.dto';
import { IdParamDto } from './dto/id-param.dto';
import { ChangeBusinessSettingsDomainSettingsDto } from './dto/change-business-settings-domain-settings.dto'; 
import { ChangeBusinessSettingsThemeConfigDto } from './dto/change-business-settings-theme-config.dto'; 

@Controller('businessesSettings')
export class BusinessSettingsController {
  constructor(
    private readonly listBusinessesSettings: ListBusinessSettingsUseCase,
    private readonly createBusinessSettings: CreateBusinessSettingsUseCase,
    private readonly updateBusinessSettings: UpdateBusinessSettingsUseCase,
    private readonly changeBusinessSettingsDomainSettings: ChangeBusinessSettingsDomainSettingsUseCase,
    private readonly changeBusinessSettingsThemeConfig: ChangeBusinessSettingsThemeConfigUseCase,
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
  
  @Patch(':id/domainSettings')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeDomainSettings(
    @Param('id') id: string,
    @Body() changeDomainSettingsDto: ChangeBusinessSettingsDomainSettingsDto
  ) {
    return await this.changeBusinessSettingsDomainSettings.execute(id, changeDomainSettingsDto.domainSettings);
  }
  
  @Patch(':id/themeConfig')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async changeThemeConfig(
    @Param('id') id: string,
    @Body() changeThemeConfigDto: ChangeBusinessSettingsThemeConfigDto
  ) {
    return await this.changeBusinessSettingsThemeConfig.execute(id, changeThemeConfigDto.themeConfig);
  }

  @Put(':id')
  async update(
    @Param() params: IdParamDto,
    @Body() body: UpdateBusinessSettingsDto
  ) {
    return await this.updateBusinessSettings.execute(params.id,body);
  }
}
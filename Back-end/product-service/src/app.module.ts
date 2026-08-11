import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/persistence/typeorm.config'; 
import { BusinessController } from './infrastructure/transport/http/business.controller';
import { BusinessSettingsController } from './infrastructure/transport/http/business-settings.controller';
import { ListBusinessUseCase } from './application/use-cases/list-business.use-case';
import { CreateBusinessUseCase } from './application/use-cases/create-business.use-case';
import { UpdateBusinessUseCase } from './application/use-cases/update-business.use-case';
import { ChangeBusinessNameUseCase } from './application/use-cases/change-business-name.use-case';
import { ChangeBusinessSettingsNameUseCase } from './application/use-cases/change-business-settings-name.use-case';
import { ListBusinessSettingsUseCase } from './application/use-cases/list-business-settings.use-case';
import { CreateBusinessSettingsUseCase } from './application/use-cases/create-business-settings.use-case';
import { UpdateBusinessSettingsUseCase } from './application/use-cases/update-business-settings.use-case';
import { BusinessRepositoryImpl } from './infrastructure/persistence/repositories/business.repository.impl';
import { BusinessSettingsRepositoryImpl } from './infrastructure/persistence/repositories/business-settings.repository.impl';
import { BusinessOrmEntity } from './infrastructure/persistence/entities-orm/business.orm-entity';
import { BusinessSettingsOrmEntity } from './infrastructure/persistence/entities-orm/business-settings.orm-entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { ChangeBusinessAttributesUseCase } from './application/use-cases/change-business-attributes.use-case';
import { ChangeBusinessBusinessIdUseCase } from './application/use-cases/change-business-business-id.use-case';
import { ChangeBusinessCategoryIdUseCase } from './application/use-cases/change-business-category-id.use-case';
import { ChangeBusinessStockUseCase } from './application/use-cases/change-business-stock.use-case';
import { ChangeBusinessDescriptionUseCase } from './application/use-cases/change-business-description.use-case';
import { ChangeBusinessPriceUseCase } from './application/use-cases/change-business-price.use-case';
import { ChangeBusinessSettingsBusinessIdUseCase } from './application/use-cases/change-business-settings-business-id.use-case';
import { ChangeBusinessSettingsParentIdUseCase } from './application/use-cases/change-business-settings-parent-id.use-case';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([BusinessOrmEntity, BusinessSettingsOrmEntity]),
  ],
  controllers: [BusinessController, BusinessSettingsController],
  providers: [
    ListBusinessUseCase,
    CreateBusinessUseCase,
    UpdateBusinessUseCase,
    ChangeBusinessBusinessIdUseCase,
    ChangeBusinessCategoryIdUseCase,
    ChangeBusinessStockUseCase,
    ChangeBusinessAttributesUseCase,
    ChangeBusinessNameUseCase,
    ChangeBusinessDescriptionUseCase,
    ChangeBusinessPriceUseCase,
    { provide: 'BusinessRepository', useClass: BusinessRepositoryImpl },
    ListBusinessSettingsUseCase,
    CreateBusinessSettingsUseCase,
    UpdateBusinessSettingsUseCase,
    ChangeBusinessSettingsNameUseCase,
    ChangeBusinessSettingsBusinessIdUseCase,
    ChangeBusinessSettingsParentIdUseCase,
    { provide: 'BusinessSettingsRepository', useClass: BusinessSettingsRepositoryImpl },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); 
  }
}
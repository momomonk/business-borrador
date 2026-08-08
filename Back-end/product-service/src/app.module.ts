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
    ChangeBusinessNameUseCase,
    { provide: 'BusinessRepository', useClass: BusinessRepositoryImpl },
    ListBusinessSettingsUseCase,
    CreateBusinessSettingsUseCase,
    UpdateBusinessSettingsUseCase,
    ChangeBusinessSettingsNameUseCase,
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
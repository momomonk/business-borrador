import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './infrastructure/persistence/typeorm.config'; 
import { UserController } from './infrastructure/transport/http/user.controller';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { ChangeUserStatusUseCase } from './application/use-cases/change-user-status.use-case';
import { UserRepositoryImpl } from './infrastructure/persistence/repositories/user.repository.impl';
import { UserOrmEntity } from './infrastructure/persistence/entities-orm/user.orm-entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), // Pasamos la config externa
    TypeOrmModule.forFeature([UserOrmEntity]),
  ],
  controllers: [UserController],
  providers: [
    ListUsersUseCase,
    CreateUserUseCase,
    ChangeUserStatusUseCase,
    { provide: 'UserRepository', useClass: UserRepositoryImpl },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); 
  }
}
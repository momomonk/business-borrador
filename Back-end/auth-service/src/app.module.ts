import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt'; // <-- 1. Importas JwtModule
import { typeOrmConfig } from './infrastructure/persistence/typeorm.config'; 
import { AuthController } from './infrastructure/transport/http/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { ValidateTokenUseCase } from './application/use-cases/validate-token.use-case';
import { UserRepositoryImpl } from './infrastructure/persistence/repositories/user.repository.impl';
import { UserOrmEntity } from './infrastructure/persistence/entities-orm/user.orm-entity';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { BcryptService } from './infrastructure/persistence/services/bycrypt-password-hasher.services';
import { JwtTokenService } from './infrastructure/persistence/services/jwt.services'; 

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([UserOrmEntity]),
    JwtModule.register({
      secret: 'TU_CLAVE_SECRETA_SUPER_SEGURA',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    ValidateTokenUseCase,
    BcryptService,
    JwtTokenService,
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
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthApiService } from '../../infrastructure/persistence/services/auth-api.services';

@Injectable()
export class AuthApiGuard implements CanActivate {
  constructor(private readonly authApiService: AuthApiService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Token no proporcionado en los headers');
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    // Llamada HTTP REST al microservicio de Auth
    const payload = await this.authApiService.validateTokenWithAuthService(token);
    
    // Adjuntamos los datos del usuario a la request
    request.user = payload;
    return true;
  }
}
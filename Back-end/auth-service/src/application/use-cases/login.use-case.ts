import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { LoginDto } from '../../infrastructure/transport/http/dto/login.dto';
import { ErrorMessages } from '../../common/constants/error-messages';
import { BcryptService } from '../../infrastructure/persistence/services/bycrypt-password-hasher.services';
import { JwtTokenService } from '../../infrastructure/persistence/services/jwt.services'; // Tu servicio propio

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('UserRepository') private readonly repo: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  async execute(dto: LoginDto) {
    const userAvailable = await this.repo.findByEmail(dto.email);
    if (!userAvailable) throw new BadRequestException(ErrorMessages.EMAIL_NOT_FOUND);

    const isMatch = await this.bcryptService.comparePassword(
      dto.password,
      userAvailable.password!,
    );
    if (!isMatch) throw new BadRequestException(ErrorMessages.INVALID_CREDENTIALS);

    const payload = { id: userAvailable.id, email: userAvailable.email };
    
    const accessToken = await this.jwtTokenService.generateToken(payload);

    return {
      accessToken,
    };
  }
}
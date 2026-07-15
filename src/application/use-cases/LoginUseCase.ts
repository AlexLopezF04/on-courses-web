import { IAuthRepository } from '@domain/ports/IAuthRepository';
import { LoginRequestDto, LoginResponseDto } from '../dtos/AuthDto';

export class LoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(credentials: LoginRequestDto): Promise<LoginResponseDto> {
    if (!credentials.username || !credentials.password) {
      throw new Error('El usuario y la contraseña son requeridos');
    }
    return this.authRepository.login(credentials);
  }
}

import { IAuthRepository } from '@domain/ports/IAuthRepository';

export class LogoutUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(refreshToken: string): Promise<void> {
    return this.authRepository.logout(refreshToken);
  }
}

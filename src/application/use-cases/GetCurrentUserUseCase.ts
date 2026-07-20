import { IAuthRepository } from '@domain/ports/IAuthRepository';

export class GetCurrentUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(userId: number): Promise<any> {
    return this.authRepository.getCurrentUser(userId);
  }
}

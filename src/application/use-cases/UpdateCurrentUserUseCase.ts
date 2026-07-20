import { IAuthRepository } from '@domain/ports/IAuthRepository';

export class UpdateCurrentUserUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(userId: number, data: any): Promise<any> {
    return this.authRepository.updateCurrentUser(userId, data);
  }
}

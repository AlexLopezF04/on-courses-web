import { AxiosAuthRepository } from '../adapters/AxiosAuthRepository';
import { LoginUseCase } from '@application/use-cases/LoginUseCase';
import { GetCurrentUserUseCase } from '@application/use-cases/GetCurrentUserUseCase';
import { UpdateCurrentUserUseCase } from '@application/use-cases/UpdateCurrentUserUseCase';
import { LogoutUseCase } from '@application/use-cases/LogoutUseCase';

export const authRepositoryInstance = new AxiosAuthRepository();

export const loginUseCase = new LoginUseCase(authRepositoryInstance);
export const getCurrentUserUseCase = new GetCurrentUserUseCase(authRepositoryInstance);
export const updateCurrentUserUseCase = new UpdateCurrentUserUseCase(authRepositoryInstance);
export const logoutUseCase = new LogoutUseCase(authRepositoryInstance);


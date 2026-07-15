import { AxiosAuthRepository } from '../adapters/AxiosAuthRepository';
import { LoginUseCase } from '@application/use-cases/LoginUseCase';

export const authRepositoryInstance = new AxiosAuthRepository();

export const loginUseCase = new LoginUseCase(authRepositoryInstance);

import { AxiosModuleRepository } from '../adapters/AxiosModuleRepository';
import { GetModulesUseCase } from '@application/use-cases/GetModulesUseCase';
import { GetModuleByIdUseCase } from '@application/use-cases/GetModuleByIdUseCase';
import { CreateModuleUseCase } from '@application/use-cases/CreateModuleUseCase';
import { UpdateModuleUseCase } from '@application/use-cases/UpdateModuleUseCase';
import { DeleteModuleUseCase } from '@application/use-cases/DeleteModuleUseCase';

export const moduleRepositoryInstance = new AxiosModuleRepository();

export const getModulesUseCase = new GetModulesUseCase(moduleRepositoryInstance);
export const getModuleByIdUseCase = new GetModuleByIdUseCase(moduleRepositoryInstance);
export const createModuleUseCase = new CreateModuleUseCase(moduleRepositoryInstance);
export const updateModuleUseCase = new UpdateModuleUseCase(moduleRepositoryInstance);
export const deleteModuleUseCase = new DeleteModuleUseCase(moduleRepositoryInstance);

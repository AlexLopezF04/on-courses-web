import { IModuleRepository } from '@domain/ports/IModuleRepository';
import { Module } from '@domain/entities/Module';

export class CreateModuleUseCase {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(module: any): Promise<Module> {
    return this.moduleRepository.createModule(module);
  }
}

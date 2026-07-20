import { IModuleRepository } from '@domain/ports/IModuleRepository';
import { Module } from '@domain/entities/Module';

export class UpdateModuleUseCase {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(id: number, module: any): Promise<Module> {
    return this.moduleRepository.updateModule(id, module);
  }
}

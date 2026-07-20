import { IModuleRepository } from '@domain/ports/IModuleRepository';
import { Module } from '@domain/entities/Module';

export class GetModulesUseCase {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(courseId?: number): Promise<Module[]> {
    return this.moduleRepository.getModules(courseId);
  }
}

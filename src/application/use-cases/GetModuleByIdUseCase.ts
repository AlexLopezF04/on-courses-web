import { IModuleRepository } from '@domain/ports/IModuleRepository';
import { Module } from '@domain/entities/Module';

export class GetModuleByIdUseCase {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(id: number): Promise<Module> {
    return this.moduleRepository.getModuleById(id);
  }
}

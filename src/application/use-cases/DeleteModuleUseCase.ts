import { IModuleRepository } from '@domain/ports/IModuleRepository';

export class DeleteModuleUseCase {
  constructor(private moduleRepository: IModuleRepository) {}

  async execute(id: number): Promise<void> {
    return this.moduleRepository.deleteModule(id);
  }
}

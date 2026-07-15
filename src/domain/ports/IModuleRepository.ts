import { Module } from '@domain/entities/Module';

export interface IModuleRepository {
  getModules(courseId?: number): Promise<Module[]>;
  getModuleById(id: number): Promise<Module>;
  createModule(module: any): Promise<Module>;
  updateModule(id: number, module: any): Promise<Module>;
  deleteModule(id: number): Promise<void>;
}

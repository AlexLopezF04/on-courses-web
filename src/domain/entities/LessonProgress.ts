/**
 * Responsabilidad: Definir el modelo de datos de la entidad del dominio que representa
 * el progreso académico de un estudiante en un tema específico.
 * 
 * Dependencias: Ninguna (Pureza de dominio).
 */
export interface LessonProgress {
  id: number;
  lesson: number;
  percentage: number;
  is_completed: boolean;
  student?: number;
  enrolled_course?: number;
}

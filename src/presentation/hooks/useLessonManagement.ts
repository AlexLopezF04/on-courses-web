import React, { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { getCourseByIdUseCase } from '@infrastructure/factories/CourseFactory';
import {
  getModulesUseCase,
  createModuleUseCase,
  updateModuleUseCase,
  deleteModuleUseCase,
} from '@infrastructure/factories/ModuleFactory';
import {
  getLessonsUseCase,
  createLessonUseCase,
  updateLessonUseCase,
  deleteLessonUseCase,
} from '@infrastructure/factories/LessonFactory';
import { Course } from '@domain/entities/Course';
import { Module } from '@domain/entities/Module';
import { Lesson } from '@domain/entities/Lesson';

export const useLessonManagement = (courseIdStr?: string) => {
  const { user } = useAuthStore();
  const idCourse = Number(courseIdStr);

  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModuleId, setSelectedModuleId] = useState<number | ''>('');
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modals/Forms State
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [isEditingLesson, setIsEditingLesson] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);

  // Lesson Form Fields
  const [formLessonTitle, setFormLessonTitle] = useState('');
  const [formLessonContent, setFormLessonContent] = useState('');
  const [formLessonVideoUrl, setFormLessonVideoUrl] = useState('');
  const [formLessonOrder, setFormLessonOrder] = useState('0');
  const [formLessonModule, setFormLessonModule] = useState<number | ''>('');

  // Module creation & edit form (in-page)
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [isEditingModule, setIsEditingModule] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [moduleTitle, setModuleTitle] = useState('');
  const [moduleOrder, setModuleOrder] = useState('0');

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin';

  const loadCourseDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const courseData = await getCourseByIdUseCase.execute(idCourse);
      setCourse(courseData);

      const modulesData = await getModulesUseCase.execute(idCourse);
      setModules(modulesData);

      // Fetch all lessons for these modules
      const allLessons: Lesson[] = [];
      for (const mod of modulesData) {
        const moduleLessons = await getLessonsUseCase.execute(mod.id);
        allLessons.push(...moduleLessons);
      }
      // Sort lessons by order
      allLessons.sort((a, b) => a.order - b.order);
      setLessons(allLessons);

      if (modulesData.length > 0 && selectedModuleId === '') {
        setSelectedModuleId(modulesData[0].id);
      }
    } catch (err) {
      console.error('Failed to load course details', err);
    } finally {
      setIsLoading(false);
    }
  }, [idCourse, selectedModuleId]);

  useEffect(() => {
    if (!isNaN(idCourse)) {
      loadCourseDetails();
    }
  }, [idCourse, loadCourseDetails]);

  const handleOpenCreateModule = () => {
    setIsEditingModule(false);
    setEditingModuleId(null);
    setModuleTitle('');
    setModuleOrder(String(modules.length + 1));
    setShowModuleForm(true);
  };

  const handleOpenEditModule = (mod: Module) => {
    setIsEditingModule(true);
    setEditingModuleId(mod.id);
    setModuleTitle(mod.title);
    setModuleOrder(String(mod.order));
    setShowModuleForm(true);
  };

  const handleSaveModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleTitle.trim()) return;

    setFormLoading(true);
    try {
      if (isEditingModule && editingModuleId) {
        await updateModuleUseCase.execute(editingModuleId, {
          title: moduleTitle,
          order: Number(moduleOrder),
        });
        setSuccessMessage('Sección/Módulo actualizada correctamente');
      } else {
        await createModuleUseCase.execute({
          course: idCourse,
          title: moduleTitle,
          order: Number(moduleOrder),
        });
        setSuccessMessage('Sección/Módulo creada correctamente');
      }
      setModuleTitle('');
      setModuleOrder('0');
      setShowModuleForm(false);
      setIsEditingModule(false);
      setEditingModuleId(null);
      loadCourseDetails();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error al guardar la sección/módulo');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este módulo/sección? Las lecciones asociadas también se borrarán.')) {
      return;
    }

    setFormLoading(true);
    try {
      await deleteModuleUseCase.execute(moduleId);
      setSuccessMessage('Módulo eliminado correctamente');
      if (selectedModuleId === moduleId) {
        setSelectedModuleId('');
      }
      loadCourseDetails();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar el módulo');
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenCreateLesson = () => {
    setIsEditingLesson(false);
    setEditingLessonId(null);
    setFormLessonTitle('');
    setFormLessonContent('');
    setFormLessonVideoUrl('');
    setFormLessonOrder('0');
    setFormLessonModule(selectedModuleId || '');
    setFormError(null);
    setShowLessonModal(true);
  };

  const handleOpenEditLesson = (lesson: Lesson) => {
    setIsEditingLesson(true);
    setEditingLessonId(lesson.id);
    setFormLessonTitle(lesson.title);
    setFormLessonContent(lesson.content_text || '');
    setFormLessonVideoUrl(lesson.video_url || '');
    setFormLessonOrder(String(lesson.order));
    setFormLessonModule(lesson.module);
    setFormError(null);
    setShowLessonModal(true);
  };

  const handleSaveLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formLessonTitle.trim() || !formLessonModule) {
      setFormError('Por favor completa todos los campos obligatorios (*)');
      return;
    }

    setFormLoading(true);
    const data = {
      title: formLessonTitle,
      content_text: formLessonContent,
      video_url: formLessonVideoUrl || undefined,
      order: Number(formLessonOrder),
      module: Number(formLessonModule),
    };

    try {
      if (isEditingLesson && editingLessonId !== null) {
        await updateLessonUseCase.execute(editingLessonId, data);
        setSuccessMessage('Lección actualizada correctamente');
      } else {
        await createLessonUseCase.execute(data);
        setSuccessMessage('Lección creada correctamente');
      }
      setShowLessonModal(false);
      loadCourseDetails();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      setFormError(err.message || 'Error al guardar la lección');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLesson = async (lessonId: number) => {
    if (!isAdmin) {
      alert('Solo los administradores tienen permisos para eliminar lecciones.');
      return;
    }

    try {
      await deleteLessonUseCase.execute(lessonId);
      setSuccessMessage('Lección eliminada correctamente');
      loadCourseDetails();
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Error al eliminar la lección');
    }
  };

  const handleSeedSQLCourseStructure = async () => {
    if (!window.confirm('¿Deseas generar automáticamente los 6 Módulos y 42 Temas teóricos de Fundamentos SQL en este curso?')) {
      return;
    }

    setFormLoading(true);
    try {
      const sqlModulesData = [
        {
          title: 'Módulo 1: Introducción a las Bases de Datos y el Lenguaje SQL',
          order: 1,
          lessons: [
            { title: '1.1 ¿Qué es una Base de Datos Relacional (RDBMS)?', order: 1, content_text: '# 1.1 ¿Qué es una Base de Datos Relacional (RDBMS)?\nUn Sistema de Gestión de Bases de Datos Relacionales (RDBMS) organiza datos en tablas compuestas por filas y columnas...' },
            { title: '1.2 Modelo Cliente-Servidor en Motores SQL', order: 2, content_text: '# 1.2 Modelo Cliente-Servidor en Motores SQL\nLos motores SQL modernos (PostgreSQL, MySQL) operan bajo el patrón Cliente-Servidor vía TCP/IP...' },
            { title: '1.3 Clasificación del Lenguaje SQL (DDL, DML, DCL, TCL)', order: 3, content_text: '# 1.3 Clasificación del Lenguaje SQL\nSQL se divide en 4 sublenguajes principales: DDL, DML, DCL y TCL...' },
            { title: '1.4 Tipos de Datos Fundamentales en SQL', order: 4, content_text: '# 1.4 Tipos de Datos Fundamentales\nConoce los tipos INTEGER, VARCHAR, DECIMAL, TIMESTAMP y BOOLEAN...' },
            { title: '1.5 Tu Primera Sentencia SQL: SELECT', order: 5, content_text: '# 1.5 Tu Primera Sentencia SQL: SELECT\nLa instrucción SELECT se utiliza para recuperar datos o evaluar expresiones...' },
            { title: '1.6 Entendiendo Tablas, Columnas y Esquemas', order: 6, content_text: '# 1.6 Anatomía de Tablas y Esquemas en SQL\nAprende cómo se jerarquizan los objetos dentro de la base de datos...' },
            { title: '1.7 Buenas Prácticas de Sintaxis SQL', order: 7, content_text: '# 1.7 Buenas Prácticas de Sintaxis SQL\nEscribir código SQL legible y estandarizado con mayúsculas reservadas...' },
          ],
        },
        {
          title: 'Módulo 2: Consultas Básicas y Filtrado de Datos (DML)',
          order: 2,
          lessons: [
            { title: '2.1 Filtrado de Filas con la Cláusula WHERE', order: 1, content_text: '# 2.1 Filtrado con WHERE\nFiltra registros específicos utilizando la cláusula WHERE...' },
            { title: '2.2 Operadores Lógicos (AND, OR, NOT, LIKE, ILIKE)', order: 2, content_text: '# 2.2 Operadores Lógicos y de Comparación en SQL...' },
            { title: '2.3 Rangos y Listas de Valores (BETWEEN e IN)', order: 3, content_text: '# 2.3 Rangos y Listas con BETWEEN e IN...' },
            { title: '2.4 Manejo de Valores Ausentes con IS NULL e IS NOT NULL', order: 4, content_text: '# 2.4 Valores Ausentes (NULL) en SQL...' },
            { title: '2.5 Ordenamiento de Resultados con ORDER BY (ASC / DESC)', order: 5, content_text: '# 2.5 Ordenamiento de Resultados con ORDER BY...' },
            { title: '2.6 Paginación con LIMIT y OFFSET', order: 6, content_text: '# 2.6 Paginación con LIMIT y OFFSET...' },
            { title: '2.7 Alias de Columnas y Tablas con AS', order: 7, content_text: '# 2.7 Alias de Columnas y Tablas con AS...' },
          ],
        },
        {
          title: 'Módulo 3: Funciones de Agregación y Agrupamiento',
          order: 3,
          lessons: [
            { title: '3.1 Funciones de Agregación (COUNT, SUM, AVG, MIN, MAX)', order: 1, content_text: '# 3.1 Funciones de Agregación...' },
            { title: '3.2 Agrupamiento de Datos con GROUP BY', order: 2, content_text: '# 3.2 Agrupamiento con GROUP BY...' },
            { title: '3.3 Filtrar Grupos Agregados con HAVING', order: 3, content_text: '# 3.3 Filtrar Grupos con HAVING vs WHERE...' },
            { title: '3.4 Eliminación de Duplicados con DISTINCT', order: 4, content_text: '# 3.4 Eliminación de Duplicados con DISTINCT...' },
            { title: '3.5 Expresiones Condicionales con CASE ... WHEN', order: 5, content_text: '# 3.5 Lógica Condicional con CASE WHEN...' },
            { title: '3.6 Funciones Matemáticas y de Cadenas en SQL', order: 6, content_text: '# 3.6 Manipulación de Texto y Matemáticas...' },
            { title: '3.7 Operaciones con Fechas y Timestamps', order: 7, content_text: '# 3.7 Manejo de Fechas y Timestamps...' },
          ],
        },
        {
          title: 'Módulo 4: Relaciones entre Tablas y Combinaciones (JOINS)',
          order: 4,
          lessons: [
            { title: '4.1 Primary Keys y Foreign Keys', order: 1, content_text: '# 4.1 Claves Primarias y Foráneas...' },
            { title: '4.2 Uniones Internas con INNER JOIN', order: 2, content_text: '# 4.2 Uniones Internas con INNER JOIN...' },
            { title: '4.3 Uniones Izquierdas y Derechas con LEFT / RIGHT JOIN', order: 3, content_text: '# 4.3 LEFT JOIN y RIGHT JOIN...' },
            { title: '4.4 Uniones Completas con FULL OUTER JOIN', order: 4, content_text: '# 4.4 FULL OUTER JOIN...' },
            { title: '4.5 Autouniones de Tablas con SELF JOIN', order: 5, content_text: '# 4.5 SELF JOIN...' },
            { title: '4.6 Producto Cartesiano con CROSS JOIN', order: 6, content_text: '# 4.6 CROSS JOIN...' },
            { title: '4.7 Operadores de Conjuntos (UNION, INTERSECT, EXCEPT)', order: 7, content_text: '# 4.7 UNION, INTERSECT y EXCEPT...' },
          ],
        },
        {
          title: 'Módulo 5: Diseño de Modelos Relacionales (DDL & DML)',
          order: 5,
          lessons: [
            { title: '5.1 Creación de Tablas con CREATE TABLE y Constraints', order: 1, content_text: '# 5.1 CREATE TABLE y Restricciones...' },
            { title: '5.2 Inserción de Registros con INSERT INTO', order: 2, content_text: '# 5.2 INSERT INTO...' },
            { title: '5.3 Actualización Segura con UPDATE', order: 3, content_text: '# 5.3 UPDATE...' },
            { title: '5.4 Eliminación con DELETE vs TRUNCATE', order: 4, content_text: '# 5.4 DELETE vs TRUNCATE...' },
            { title: '5.5 Modificación de Estructuras con ALTER TABLE', order: 5, content_text: '# 5.5 ALTER TABLE...' },
            { title: '5.6 Destrucción de Objetos con DROP TABLE', order: 6, content_text: '# 5.6 DROP TABLE...' },
            { title: '5.7 Integridad Referencial y ON DELETE CASCADE', order: 7, content_text: '# 5.7 ON DELETE CASCADE...' },
          ],
        },
        {
          title: 'Módulo 6: Conceptos Avanzados: Transacciones, Índices y Vistas',
          order: 6,
          lessons: [
            { title: '6.1 Propiedades ACID en RDBMS', order: 1, content_text: '# 6.1 Propiedades ACID...' },
            { title: '6.2 Control de Transacciones (BEGIN, COMMIT, ROLLBACK)', order: 2, content_text: '# 6.2 Transacciones en SQL...' },
            { title: '6.3 Optimización de Consultas con CREATE INDEX', order: 3, content_text: '# 6.3 Índices en SQL...' },
            { title: '6.4 Vistas Guardadas con CREATE VIEW', order: 4, content_text: '# 6.4 CREATE VIEW...' },
            { title: '6.5 Subconsultas (Subqueries) Anidadas y Correlacionadas', order: 5, content_text: '# 6.5 Subconsultas Anidadas...' },
            { title: '6.6 Funciones de Ventana (Window Functions)', order: 6, content_text: '# 6.6 Window Functions (ROW_NUMBER, OVER)...' },
            { title: '6.7 Proyecto Integrador Final: Modelado E-commerce', order: 7, content_text: '# 6.7 Proyecto Integrador Final...' },
          ],
        },
      ];

      for (const mod of sqlModulesData) {
        const createdMod = await createModuleUseCase.execute({
          course: idCourse,
          title: mod.title,
          order: mod.order,
        });

        for (const les of mod.lessons) {
          await createLessonUseCase.execute({
            title: les.title,
            order: les.order,
            content_text: les.content_text,
            module: createdMod.id,
          });
        }
      }

      setSuccessMessage('🎉 ¡Se crearon con éxito los 6 Módulos y 42 Temas Teóricos para este curso!');
      loadCourseDetails();
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (err: any) {
      alert(err.message || 'Error al sembrar el temario de SQL');
    } finally {
      setFormLoading(false);
    }
  };

  return {
    idCourse,
    course,
    modules,
    selectedModuleId,
    setSelectedModuleId,
    lessons,
    isLoading,
    showLessonModal,
    setShowLessonModal,
    isEditingLesson,
    formLessonTitle,
    setFormLessonTitle,
    formLessonContent,
    setFormLessonContent,
    formLessonVideoUrl,
    setFormLessonVideoUrl,
    formLessonOrder,
    setFormLessonOrder,
    formLessonModule,
    setFormLessonModule,
    showModuleForm,
    setShowModuleForm,
    isEditingModule,
    moduleTitle,
    setModuleTitle,
    moduleOrder,
    setModuleOrder,
    formLoading,
    formError,
    successMessage,
    isAdmin,
    handleOpenCreateModule,
    handleOpenEditModule,
    handleSaveModule,
    handleDeleteModule,
    handleCreateModule: handleSaveModule,
    handleOpenCreateLesson,
    handleOpenEditLesson,
    handleSaveLesson,
    handleDeleteLesson,
    handleSeedSQLCourseStructure,
  };
};

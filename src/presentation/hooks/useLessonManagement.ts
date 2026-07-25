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
  const [formLessonDurationMinutes, setFormLessonDurationMinutes] = useState('15');
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

      let activeModules: Module[] = courseData.modules || [];

      try {
        const apiModules = await getModulesUseCase.execute(idCourse);
        if (apiModules && apiModules.length >= (courseData.modules?.length || 0)) {
          activeModules = apiModules;
        }
      } catch (modErr) {
        console.warn('API getModules failed, using enriched course modules', modErr);
      }

      setModules(activeModules);

      // Extract all lessons for activeModules
      const allLessons: Lesson[] = [];
      let hasEmbeddedLessons = false;

      for (const mod of activeModules) {
        if (mod.lessons && mod.lessons.length > 0) {
          allLessons.push(...mod.lessons);
          hasEmbeddedLessons = true;
        }
      }

      if (!hasEmbeddedLessons) {
        for (const mod of activeModules) {
          try {
            const moduleLessons = await getLessonsUseCase.execute(mod.id);
            allLessons.push(...moduleLessons);
          } catch {
            if (mod.lessons) allLessons.push(...mod.lessons);
          }
        }
      }

      // Clean broken video URLs
      allLessons.forEach((les) => {
        if ((les.video_url || '').includes('kUMe1FH4CHE')) {
          les.video_url = '';
        }
      });

      allLessons.sort((a, b) => a.order - b.order);
      setLessons(allLessons);

      if (activeModules.length > 0 && selectedModuleId === '') {
        setSelectedModuleId(activeModules[0].id);
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
    setFormLessonDurationMinutes('15');
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
    setFormLessonDurationMinutes(String(lesson.duration_seconds ? Math.round(lesson.duration_seconds / 60) : 15));
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
      duration_seconds: (Number(formLessonDurationMinutes) || 15) * 60,
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
    formLessonDurationMinutes,
    setFormLessonDurationMinutes,
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
  };
};

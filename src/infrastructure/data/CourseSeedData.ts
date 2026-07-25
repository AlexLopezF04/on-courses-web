import { Course } from '@domain/entities/Course';
import { Module } from '@domain/entities/Module';

export interface RichCourseData {
  description: string;
  cover_image: string;
  modules: Module[];
}

export function getSavedCustomCover(courseId: number): string | null {
  try {
    const customCovers = JSON.parse(localStorage.getItem('oncourses_custom_covers') || '{}');
    return customCovers[courseId] || null;
  } catch {
    return null;
  }
}

export function saveCustomCover(courseId: number, coverDataUrl: string): void {
  try {
    const customCovers = JSON.parse(localStorage.getItem('oncourses_custom_covers') || '{}');
    customCovers[courseId] = coverDataUrl;
    localStorage.setItem('oncourses_custom_covers', JSON.stringify(customCovers));
  } catch (err) {
    console.warn('Failed to save custom cover to localStorage', err);
  }
}

export function getSavedActiveState(courseId: number): boolean | null {
  try {
    const states = JSON.parse(localStorage.getItem('oncourses_custom_active_states') || '{}');
    if (typeof states[courseId] === 'boolean') {
      return states[courseId];
    }
    return null;
  } catch {
    return null;
  }
}

export function saveActiveState(courseId: number, isActive: boolean): void {
  try {
    const states = JSON.parse(localStorage.getItem('oncourses_custom_active_states') || '{}');
    states[courseId] = isActive;
    localStorage.setItem('oncourses_custom_active_states', JSON.stringify(states));
  } catch (err) {
    console.warn('Failed to save active state to localStorage', err);
  }
}

export function getSavedPrice(courseId: number): string | null {
  try {
    const prices = JSON.parse(localStorage.getItem('oncourses_custom_prices') || '{}');
    if (prices[courseId] !== undefined && prices[courseId] !== null) {
      return String(prices[courseId]);
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCustomPrice(courseId: number, price: string): void {
  try {
    const prices = JSON.parse(localStorage.getItem('oncourses_custom_prices') || '{}');
    prices[courseId] = price;
    localStorage.setItem('oncourses_custom_prices', JSON.stringify(prices));
  } catch (err) {
    console.warn('Failed to save custom price to localStorage', err);
  }
}

export const COURSE_SEED_DETAILS: Record<string, RichCourseData> = {
  // Course 1: Python 3: Desde Cero hasta Inteligencia Artificial (COMPLETO 100%)
  python: {
    cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en Python 3.12. Domina desde la sintaxis básica, tipos de datos y estructuras nativas, hasta la programación orientada a objetos (POO), manejo de excepciones, decoradores, procesamiento científico con Pandas/NumPy y automatización de tareas.',
    modules: [
      {
        id: 101,
        course: 1,
        order: 1,
        title: 'Módulo 1: Fundamentos de Python 3.12 y Estructuras de Datos Primarias',
        description: 'Instalación, sintaxis limpia, variables dinámicas, colecciones nativas y control de flujo en Python.',
        lessons: [
          {
            id: 1001,
            module: 101,
            order: 1,
            title: 'Lección 1.1: Introducción a Python 3.12, Sintaxis y Primer Script',
            duration_seconds: 900,
            content_text: `### 🐍 Manual Teórico-Práctico: Introducción a Python 3.12 y Sintaxis

Bienvenido a la guía de estudio de **Python 3**. Python es un lenguaje de alto nivel, interpretado, de tipado dinámico y ampliamente utilizado en desarrollo web, inteligencia artificial y ciencia de datos.

---

#### 1. Tu Primer Script en Python

\`\`\`python
# Definición de variables con inferencia de tipo
nombre_estudiante: str = "Alex López"
curso_activo: str = "Python 3 Profesional"
horas_estudio: int = 40
progreso_porcentaje: float = 95.5

print(f"Estudiante: {nombre_estudiante}")
print(f"Curso: {curso_activo} | Avance: {progreso_porcentaje}%")
\`\`\`

---

#### 💡 Tabla de Tipos de Datos Primarios

| Tipo en Python | Nombre | Ejemplo de Uso |
| --- | --- | --- |
| \`int\` | Entero | \`edad = 25\` |
| \`float\` | Decimal / Flotante | \`precio = 19.99\` |
| \`str\` | Cadena de caracteres | \`mensaje = "Hola OnCourses"\` |
| \`bool\` | Booleano | \`activo = True\` |`,
            resources: ['https://docs.python.org/3/']
          },
          {
            id: 1002,
            module: 101,
            order: 2,
            title: 'Lección 1.2: Estructuras de Datos Nativas: Listas, Tuplas, Diccionarios y Sets',
            duration_seconds: 1050,
            content_text: `### 📚 Manual de Estudio: Colecciones Nativas en Python

Python provee 4 tipos de datos nativos para almacenar colecciones: **Listas** (mutables e indexadas), **Tuplas** (inmutables), **Diccionarios** (clave-valor) y **Sets** (elementos únicos).`,
            resources: ['https://docs.python.org/3/tutorial/datastructures.html']
          },
          {
            id: 1003,
            module: 101,
            order: 3,
            title: 'Lección 1.3: Control de Flujo Avanzado y List Comprensions',
            duration_seconds: 960,
            content_text: `### ⚡ Manual Práctico: List Comprensions y Filtrado de Datos`,
            resources: ['https://docs.python.org/3/tutorial/controlflow.html']
          }
        ]
      },
      {
        id: 102,
        course: 1,
        order: 2,
        title: 'Módulo 2: Programación Orientada a Objetos (POO) y Manejo de Archivos',
        description: 'Funciones, decoradores, clases, herencia, encapsulamiento y lectura/escritura de archivos.',
        lessons: [
          {
            id: 1004,
            module: 102,
            order: 1,
            title: 'Lección 2.1: Funciones en Python, Argumentos *args/**kwargs y Decoradores',
            duration_seconds: 1100,
            content_text: `### 🛠️ Manual Avanzado: Funciones y Decoradores en Python`,
            resources: ['https://docs.python.org/3/glossary.html#term-decorator']
          },
          {
            id: 1005,
            module: 102,
            order: 2,
            title: 'Lección 2.2: Programación Orientada a Objetos: Clases, Herencia y Polimorfismo',
            duration_seconds: 1250,
            content_text: `### 🏛️ Manual de Estudio: POO en Python con Dunder Methods`,
            resources: ['https://docs.python.org/3/tutorial/classes.html']
          },
          {
            id: 1006,
            module: 102,
            order: 3,
            title: 'Lección 2.3: Lectura/Escritura de Archivos (JSON, CSV) y Excepciones',
            duration_seconds: 1020,
            content_text: `### 📂 Manual Práctico: Manejo Seguro de Archivos con Context Managers`,
            resources: ['https://docs.python.org/3/tutorial/inputoutput.html']
          }
        ]
      },
      {
        id: 103,
        course: 1,
        order: 3,
        title: 'Módulo 3: Automatización, Data Science y Machine Learning con Python',
        description: 'Procesamiento de datos con Pandas y NumPy, consumo de APIs y proyecto integrador.',
        lessons: [
          {
            id: 1007,
            module: 103,
            order: 1,
            title: 'Lección 3.1: Procesamiento Científico de Datos con NumPy y Pandas',
            duration_seconds: 1150,
            content_text: `### 📊 Manual Teórico-Práctico: Análisis de Datos con Pandas DataFrames`,
            resources: ['https://pandas.pydata.org/docs/']
          },
          {
            id: 1008,
            module: 103,
            order: 2,
            title: 'Lección 3.2: Consumo de APIs REST con Requests y Servidores con FastAPI',
            duration_seconds: 1100,
            content_text: `### 🌐 Manual Práctico: APIs REST Asíncronas con FastAPI`,
            resources: ['https://fastapi.tiangolo.com/']
          },
          {
            id: 1009,
            module: 103,
            order: 3,
            title: 'Lección 3.3: Proyecto Integrador: Pipeline de Automatización y Análisis de Datos',
            duration_seconds: 1600,
            content_text: `### 🚀 Proyecto Integrador: Script Completo de Automatización en Python

#### 🏆 ¡Felicidades!
Has completado con éxito el curso práctico de **Python 3: Desde Cero hasta Inteligencia Artificial**.`,
            resources: ['https://docs.python.org/3/']
          }
        ]
      }
    ]
  },

  // Course 2: React 19 & Next.js 15
  react: {
    cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en desarrollo web moderno con React 19 y Next.js 15 App Router.',
    modules: [
      {
        id: 201,
        course: 2,
        order: 1,
        title: 'Módulo 1: Fundamentos de React 19, JSX, Hooks y Server Components',
        description: 'Compilador de React 19, componentes de servidor, manejo de estado moderno e integración de hooks.',
        lessons: [
          {
            id: 2001,
            module: 201,
            order: 1,
            title: 'Lección 1.1: Novedades de React 19, JSX y el Compilador de React (React Compiler)',
            duration_seconds: 900,
            content_text: `### ⚛️ Manual Teórico-Práctico: React 19 y la Era del React Compiler`,
            resources: ['https://react.dev/blog/2024/04/25/react-19']
          }
        ]
      }
    ]
  },

  // Course 3: Terminal Bash
  terminal: {
    cover_image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en la consola Linux y scripts en Bash.',
    modules: [
      {
        id: 301,
        course: 3,
        order: 1,
        title: 'Módulo 1: Navegación, Sistema de Archivos y Permisos en GNU/Linux',
        description: 'Estructura de directorios Linux, comandos esenciales de navegación, gestión de archivos y permisos de seguridad.',
        lessons: [
          {
            id: 3001,
            module: 301,
            order: 1,
            title: 'Lección 1.1: Estructura del Sistema de Archivos Linux (/bin, /etc, /var) y Comandos ls, cd, pwd',
            duration_seconds: 900,
            content_text: `### 💻 Manual Teórico-Práctico: Navegación en la Terminal Linux`,
            resources: ['https://www.gnu.org/software/bash/manual/']
          }
        ]
      }
    ]
  },

  // Course 4: Git & GitHub
  git: {
    cover_image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en control de versiones distribuido con Git y colaboración en GitHub.',
    modules: [
      {
        id: 401,
        course: 4,
        order: 1,
        title: 'Módulo 1: Fundamentos de Git, Arquitectura Local y Primeros Pasos',
        description: 'Conceptos de control de versiones distribuido, los 3 estados de Git, comandos básicos e inspección de cambios.',
        lessons: [
          {
            id: 4001,
            module: 401,
            order: 1,
            title: 'Lección 1.1: Arquitectura de los 3 Estados de Git y Configuración Inicial',
            duration_seconds: 900,
            content_text: `### 🌿 Manual Teórico-Práctico: Arquitectura Local de Git`,
            resources: ['https://git-scm.com/book/es/v2']
          }
        ]
      }
    ]
  },

  // Course 5: PostgreSQL
  postgresql: {
    cover_image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en PostgreSQL. Domina el diseño relacional avanzado, normalización (1FN-3FN), indexación B-Tree y GIN, análisis de planes de ejecución con EXPLAIN ANALYZE, control de concurrencia ACID/MVCC y mantenimiento preventivo.',
    modules: [
      {
        id: 501,
        course: 5,
        order: 1,
        title: 'Módulo 1: Diseños de Bases de Datos Relacionales y Normalización en PostgreSQL',
        description: 'Construcción de esquemas relacionales robustos, claves primarias, claves foráneas y restricciones avanzadas.',
        lessons: [
          {
            id: 5001,
            module: 501,
            order: 1,
            title: 'Lección 1.1: Modelo Entidad-Relación y Normalización (1FN, 2FN, 3FN)',
            duration_seconds: 900,
            content_text: `### 📚 Manual Teórico-Práctico: Modelo Entidad-Relación y Normalización en PostgreSQL`,
            resources: ['https://www.postgresql.org/docs/current/ddl.html']
          }
        ]
      }
    ]
  },

  // Course 7: Swift
  swift: {
    cover_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en desarrollo móvil iOS con Swift 5.10 y SwiftUI.',
    modules: [
      {
        id: 701,
        course: 7,
        order: 1,
        title: 'Módulo 1: Fundamentos de Swift 5.10+ y Programación Orientada a Protocolos',
        description: 'Sintaxis del lenguaje Swift, tipado estático, desempaquetado seguro de optionals, structs, classes y arquitectura orientada a protocolos.',
        lessons: [
          {
            id: 7001,
            module: 701,
            order: 1,
            title: 'Lección 1.1: Sintaxis Básica de Swift, Optionals (Unwrapping) y Control de Flujo',
            duration_seconds: 900,
            content_text: `### 📱 Manual Teórico-Práctico: Sintaxis Swift, Optionals y Desempaquetado Seguro`,
            resources: ['https://docs.swift.org/swift-book/']
          }
        ]
      }
    ]
  },

  // Course 8: Flutter
  flutter: {
    cover_image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en desarrollo móvil multiplataforma para iOS y Android con Flutter 3.24 y Dart 3.5.',
    modules: [
      {
        id: 801,
        course: 8,
        order: 1,
        title: 'Módulo 1: Fundamentos del Lenguaje Dart 3.5+ y Programación Reactiva',
        description: 'Sintaxis de Dart, Sound Null Safety, clases, mixins y programación asíncrona.',
        lessons: [
          {
            id: 8001,
            module: 801,
            order: 1,
            title: 'Lección 1.1: Sintaxis Moderna de Dart, Null Safety y Tipos Primarios',
            duration_seconds: 900,
            content_text: `### 🎯 Manual Teórico-Práctico: Sintaxis de Dart 3.5 y Sound Null Safety`,
            resources: ['https://dart.dev/']
          }
        ]
      }
    ]
  },

  // Course 9: Golang
  golang: {
    cover_image: 'https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en el lenguaje Go (Golang 1.23+). Domina la sintaxis limpia de Go, concurrencia masiva con Goroutines y Canales, desarrollo de APIs REST de alta velocidad con Gin Framework, interacción con PostgreSQL mediante GORM.',
    modules: [
      {
        id: 901,
        course: 9,
        order: 1,
        title: 'Módulo 1: Fundamentos de Go (Golang 1.23+), Rutinas de Go (Goroutines) y Canales',
        description: 'Sintaxis del lenguaje Go, punteros, estructuras, interfaces implícitas y concurrencia ligera.',
        lessons: [
          {
            id: 9001,
            module: 901,
            order: 1,
            title: 'Lección 1.1: Sintaxis Básica de Go, Tipos Primarios, Punteros y Estructuras (Structs)',
            duration_seconds: 900,
            content_text: `### 🐹 Manual Teórico-Práctico: Sintaxis de Go 1.23, Punteros y Structs`,
            resources: ['https://go.dev/']
          }
        ]
      }
    ]
  },

  // Course 10: JavaScript
  javascript: {
    cover_image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en JavaScript moderno (ES2024) y TypeScript.',
    modules: [
      {
        id: 1001,
        course: 10,
        order: 1,
        title: 'Módulo 1: Fundamentos de JavaScript ES6+ (Variables, Funciones y Async/Await)',
        description: 'Sintaxis moderna de JS, scope, arrow functions, desestructuración y programación asíncrona.',
        lessons: [
          {
            id: 10001,
            module: 1001,
            order: 1,
            title: 'Lección 1.1: Declaración de Variables (const, let), Scope Lexical y Arrow Functions',
            duration_seconds: 900,
            content_text: `### 🟨 Manual Teórico-Práctico: JavaScript Moderno ES6+`,
            resources: ['https://developer.mozilla.org/es/docs/Web/JavaScript']
          }
        ]
      }
    ]
  }
};

// Aliases for seed lookup
COURSE_SEED_DETAILS.sql = COURSE_SEED_DETAILS.postgresql;
COURSE_SEED_DETAILS.ios = COURSE_SEED_DETAILS.swift;
COURSE_SEED_DETAILS.nextjs = COURSE_SEED_DETAILS.react;
COURSE_SEED_DETAILS.dart = COURSE_SEED_DETAILS.flutter;
COURSE_SEED_DETAILS.k8s = COURSE_SEED_DETAILS.docker;
COURSE_SEED_DETAILS.devops = COURSE_SEED_DETAILS.docker;
COURSE_SEED_DETAILS.go = COURSE_SEED_DETAILS.golang;
COURSE_SEED_DETAILS.bash = COURSE_SEED_DETAILS.terminal;

export function getCanonicalCourseId(course: { id: number; title?: string; slug?: string }): number {
  const titleLower = (course.title || '').toLowerCase();
  const slugLower = (course.slug || '').toLowerCase();

  if (course.id === 1 || titleLower.includes('python') || slugLower.includes('python')) return 1;
  if (course.id === 2 || titleLower.includes('react') || titleLower.includes('next') || slugLower.includes('react') || slugLower.includes('next')) return 2;
  if (course.id === 3 || titleLower.includes('bash') || titleLower.includes('terminal') || slugLower.includes('terminal') || slugLower.includes('bash')) return 3;
  if (course.id === 4 || titleLower.includes('git') || slugLower.includes('git')) return 4;
  if (course.id === 5 || titleLower.includes('postgres') || slugLower.includes('postgres')) return 5;
  if (course.id === 6 || (titleLower.includes('fundamento') && titleLower.includes('base'))) return 6;
  if (course.id === 7 || titleLower.includes('swift') || titleLower.includes('ios') || slugLower.includes('swift') || slugLower.includes('ios')) return 7;
  if (course.id === 8 || titleLower.includes('flutter') || titleLower.includes('dart') || slugLower.includes('flutter')) return 8;
  if (course.id === 9 || titleLower.includes('golang') || titleLower.includes('microservicio') || slugLower.includes('golang') || (titleLower.includes('go') && !titleLower.includes('algoritmo'))) return 9;
  if (course.id === 10 || titleLower.includes('javascript') || titleLower.includes('js') || slugLower.includes('javascript') || slugLower.includes('js')) return 10;

  return course.id >= 1 && course.id <= 10 ? course.id : 1;
}

/**
 * Utility function to enrich any course from backend or fallback
 */
export function enrichCourseData(course: Course): Course {
  const canonicalId = getCanonicalCourseId(course);
  let seedKey = 'python';

  if (canonicalId === 1) seedKey = 'python';
  else if (canonicalId === 2) seedKey = 'react';
  else if (canonicalId === 3) seedKey = 'terminal';
  else if (canonicalId === 4) seedKey = 'git';
  else if (canonicalId === 5 || canonicalId === 6) seedKey = 'postgresql';
  else if (canonicalId === 7) seedKey = 'swift';
  else if (canonicalId === 8) seedKey = 'flutter';
  else if (canonicalId === 9) seedKey = 'golang';
  else if (canonicalId === 10) seedKey = 'javascript';

  const seed = COURSE_SEED_DETAILS[seedKey] || COURSE_SEED_DETAILS.python;
  const savedCover = getSavedCustomCover(canonicalId);
  const savedActive = getSavedActiveState(canonicalId);
  const savedPrice = getSavedPrice(canonicalId);

  const sourceModules =
    course.modules && course.modules.length >= seed.modules.length ? course.modules : seed.modules;

  const cleanedModules = sourceModules.map((mod) => ({
    ...mod,
    course: canonicalId,
    lessons: (mod.lessons || []).map((les) => ({
      ...les,
      video_url: (les.video_url || '').includes('kUMe1FH4CHE') ? '' : les.video_url,
    })),
  }));

  return {
    ...course,
    id: canonicalId,
    price: savedPrice !== null ? savedPrice : (course.price || '9.99'),
    cover_image: savedCover || course.cover_image || seed.cover_image,
    is_active: savedActive !== null ? savedActive : (course.is_active ?? true),
    description: course.description && course.description.length > 20 ? course.description : seed.description,
    modules: cleanedModules,
  };
}

/**
 * Generate full seed course for any ID 1..10
 */
export function getFallbackCourse(id: number): Course {
  const canonicalId = id >= 1 && id <= 10 ? id : 1;
  const titles: Record<number, string> = {
    1: 'Python 3: Desde Cero hasta Inteligencia Artificial',
    2: 'React 19 & Next.js 15: Guía Práctica Fullstack',
    3: 'Terminal Bash & Consola Linux: Guía Profesional',
    4: 'Git & GitHub: Control de Versiones en Equipo',
    5: 'PostgreSQL: Optimización de Consultas y Modelado',
    6: 'Fundamentos de Bases de Datos - SQL',
    7: 'Desarrollo iOS con Swift y SwiftUI desde Cero',
    8: 'Flutter 3.24 & Dart desde Cero: Desarrollo Móvil Multiplataforma',
    9: 'Go (Golang): APIs REST de Alta Concurrencia y Microservicios',
    10: 'JavaScript Moderno ES2024 & TypeScript desde Cero',
  };

  const title = titles[canonicalId] || `Curso #${canonicalId}: Desarrollo de Software Avanzado`;
  
  let seedKey = 'python';
  if (canonicalId === 1) seedKey = 'python';
  else if (canonicalId === 2) seedKey = 'react';
  else if (canonicalId === 3) seedKey = 'terminal';
  else if (canonicalId === 4) seedKey = 'git';
  else if (canonicalId === 5 || canonicalId === 6) seedKey = 'postgresql';
  else if (canonicalId === 7) seedKey = 'swift';
  else if (canonicalId === 8) seedKey = 'flutter';
  else if (canonicalId === 9) seedKey = 'golang';
  else if (canonicalId === 10) seedKey = 'javascript';

  const seed = COURSE_SEED_DETAILS[seedKey] || COURSE_SEED_DETAILS.python;
  const savedCover = getSavedCustomCover(canonicalId);
  const savedActive = getSavedActiveState(canonicalId);
  const savedPrice = getSavedPrice(canonicalId);

  return {
    id: canonicalId,
    title: title,
    slug: `curso-${canonicalId}`,
    price: savedPrice !== null ? savedPrice : (canonicalId % 2 === 0 ? '19.99' : '9.99'),
    cover_image: savedCover || seed.cover_image,
    category: 1,
    category_name: 'Desarrollo de Software',
    professor_name: 'Prof. Alex López',
    is_active: savedActive !== null ? savedActive : true,
    modules_count: seed.modules.length,
    created_at: new Date().toISOString(),
    description: seed.description,
    modules: seed.modules.map((mod) => ({
      ...mod,
      course: canonicalId,
    })),
  };
}

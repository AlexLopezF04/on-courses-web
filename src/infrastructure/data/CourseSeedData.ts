import { Course } from '@domain/entities/Course';
import { Module } from '@domain/entities/Module';

export interface RichCourseData {
  description: string;
  cover_image: string;
  modules: Module[];
}

export const COURSE_SEED_DETAILS: Record<string, RichCourseData> = {
  // Course 1: Python
  python: {
    cover_image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    description: 'Aprende programación moderna con Python 3. Desde sintaxis básica, estructuras de datos y control de flujo, hasta funciones, programación orientada a objetos (POO) y proyectos reales de automatización.',
    modules: [
      {
        id: 101,
        course: 1,
        order: 1,
        title: 'Módulo 1: Fundamentos y Entorno Python',
        description: 'Instalación del entorno, ejecutables y la sintaxis inicial del lenguaje.',
        lessons: [
          {
            id: 1001,
            module: 101,
            order: 1,
            title: '1.1 Introducción a Python y Primer Script "Hola Mundo"',
            duration_seconds: 480,
            video_url: 'https://www.youtube.com/embed/chPhlsxEzy0',
            content_text: `Bienvenido al curso completo de Python en OnCourses. En esta lección aprenderás los principios básicos del lenguaje de programación Python, por qué es uno de los más populares del mundo y cómo escribir tu primer programa de prueba.

### ¿Por qué aprender Python?
Python es un lenguaje de alto nivel, interpretado, de sintaxis limpia y sumamente versátil. Se utiliza en Inteligencia Artificial, Ciencia de Datos, Desarrollo Web (Django/FastAPI) y Automatización.

### Tu primer código en Python:
\`\`\`python
# Este es tu primer script en Python
print("¡Hola Mundo! Bienvenido a OnCourses")

nombre = "Alex"
print(f"Estudiante activo: {nombre}")
\`\`\`

#### Ejercicio de práctica:
Abre tu consola o entorno de desarrollo y ejecuta un comando print con tu nombre y tu meta de aprendizaje para este semestre.`,
            resources: ['https://docs.python.org/3/', 'https://python.org']
          },
          {
            id: 1002,
            module: 101,
            order: 2,
            title: '1.2 Variables, Tipos de Datos e Ingreso por Teclado',
            duration_seconds: 600,
            video_url: 'https://www.youtube.com/embed/_y9qQZXEGH4',
            content_text: `En esta lección estudiaremos el manejo de variables dinámicas en Python y los tipos de datos primarios: int, float, str y bool.

### Tipos de Datos Principales:
- **Enteros (int):** Numeros enteros como \`edad = 20\`
- **Flotantes (float):** Numeros decimales como \`promedio = 9.5\`
- **Cadenas (str):** Texto encomillado como \`curso = "Python"\`
- **Booleanos (bool):** Valores lógicos \`True\` o \`False\`

### Código de ejemplo:
\`\`\`python
nombre = input("Ingresa tu nombre: ")
edad = int(input("Ingresa tu edad: "))

print(f"Hola {nombre}, el próximo año tendrás {edad + 1} años.")
\`\`\``,
            resources: ['https://w3schools.com/python/python_datatypes.asp']
          },
          {
            id: 1003,
            module: 101,
            order: 3,
            title: '1.3 Operaciones Matemáticas y Métodos de Cadenas',
            duration_seconds: 540,
            video_url: 'https://www.youtube.com/embed/k9TUPpGqYTo',
            content_text: `Aprende a manipular texto con los métodos integrados de Python y realizar operaciones aritméticas complejas.

### Operadores Aritméticos:
- Suma: \`+\`, Resta: \`-\`, Multiplicación: \`*\`, División: \`/\`
- División entera: \`//\`, Módulo (Residuo): \`%\`, Potencia: \`**\`

### Métodos de Strings útiles:
\`\`\`python
texto = "  aprender python con oncourses  "
print(texto.strip().upper()) # "APRENDER PYTHON CON ONCOURSES"
print(texto.replace("python", "desarrollo"))
\`\`\``
          }
        ]
      },
      {
        id: 102,
        course: 1,
        order: 2,
        title: 'Módulo 2: Estructuras de Control y Colecciones',
        description: 'Toma de decisiones con condicionales, bucles iterativos y estructuras de almacenamiento.',
        lessons: [
          {
            id: 1004,
            module: 102,
            order: 1,
            title: '2.1 Estructuras Condicionales (if, elif, else)',
            duration_seconds: 720,
            video_url: 'https://www.youtube.com/embed/9OK3R89_pT0',
            content_text: `Las estructuras condicionales le permiten a tu programa tomar decisiones basadas en comparaciones lógicas.

\`\`\`python
nota = 8.5

if nota >= 9.0:
    print("Excelente trabajo")
elif nota >= 7.0:
    print("Aprobado con buen rendimiento")
else:
    print("Requiere refuerzo")
\`\`\``
          },
          {
            id: 1005,
            module: 102,
            order: 2,
            title: '2.2 Bucles e Iteraciones (for y while)',
            duration_seconds: 650,
            video_url: 'https://www.youtube.com/embed/Rk0H2k4X5rA',
            content_text: `Aprende a repetir tareas automatizadas con bucles de iteración contada (for) e iteración condicional (while).

\`\`\`python
# Iterar sobre un rango de números
for i in range(1, 6):
    print(f"Iteración número {i}")

# Bucle condicional
contador = 3
while contador > 0:
    print(f"Cuenta regresiva: {contador}")
    contador -= 1
\`\`\``
          },
          {
            id: 1006,
            module: 102,
            order: 3,
            title: '2.3 Colecciones: Listas, Tuplas y Diccionarios',
            duration_seconds: 800,
            video_url: 'https://www.youtube.com/embed/rfscVS0vtbw',
            content_text: `Organiza datos complejos de manera eficiente utilizando colecciones estructuradas.

\`\`\`python
# Lista (Mutable)
estudiantes = ["Ana", "Carlos", "Beatriz"]
estudiantes.append("David")

# Diccionario (Clave: Valor)
estudiante = {
    "nombre": "Sofia",
    "carrera": "Ingeniería de Software",
    "promedio": 9.8
}

print(f"Nombre: {estudiante['nombre']}, Carrera: {estudiante['carrera']}")
\`\`\``
          }
        ]
      },
      {
        id: 103,
        course: 1,
        order: 3,
        title: 'Módulo 3: Programación Orientada a Objetos y Proyecto Final',
        description: 'Construcción de clases, métodos, objetos y desarrollo de un proyecto integrador.',
        lessons: [
          {
            id: 1007,
            module: 103,
            order: 1,
            title: '3.1 Programación Orientada a Objetos (Clases y Métodos)',
            duration_seconds: 900,
            video_url: 'https://www.youtube.com/embed/J7x8Vv1zVbg',
            content_text: `La POO es uno de los paradigmas de programación más importantes. Aprende a crear tus propias clases y objetos.

\`\`\`python
class Estudiante:
    def __init__(self, nombre, carrera):
        self.nombre = nombre
        self.carrera = carrera
        self.cursos = []

    def inscribir_curso(self, curso):
        self.cursos.append(curso)
        print(f"{self.nombre} se inscribió en {curso}")

alumno = Estudiante("Alex López", "Software")
alumno.inscribir_curso("Python Pro")
\`\`\``
          },
          {
            id: 1008,
            module: 103,
            order: 2,
            title: '3.2 Proyecto Final: Administrador de Tareas en Consola',
            duration_seconds: 1200,
            video_url: 'https://www.youtube.com/embed/T4qTzY1Bf0w',
            content_text: `Desarrollaremos un sistema interactivo de consola para registrar, marcar como completadas y filtrar tareas académicas utilizando todo lo aprendido en el curso.`
          }
        ]
      }
    ]
  },

  // Course 2: JavaScript
  javascript: {
    cover_image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=1200&auto=format&fit=crop',
    description: 'Domina el lenguaje de la web desde cero. Sintaxis moderna ES6+, Manipulación del DOM, Eventos, Asincronía con Promises, Async/Await y consumo de APIs REST.',
    modules: [
      {
        id: 201,
        course: 2,
        order: 1,
        title: 'Módulo 1: Fundamentos de JavaScript ES6+',
        description: 'Sintaxis moderna de JavaScript, scope, const/let y funciones flecha.',
        lessons: [
          {
            id: 2001,
            module: 201,
            order: 1,
            title: '1.1 Introducción a JavaScript y Motor V8',
            duration_seconds: 500,
            video_url: 'https://www.youtube.com/embed/hdI2bqOjy3c',
            content_text: `JavaScript es el lenguaje de programación estándar de la web. En esta lección aprenderás sobre la sintaxis moderna de ES6+ y cómo se ejecuta el código en el navegador.`
          },
          {
            id: 2002,
            module: 201,
            order: 2,
            title: '1.2 Variables, Constantes y Arrow Functions',
            duration_seconds: 620,
            video_url: 'https://www.youtube.com/embed/Q9swWClqCgg',
            content_text: `Uso de const y let, alcance de bloque y declaración de funciones flecha.

\`\`\`javascript
const calcularTotal = (precio, impuesto = 0.12) => {
  return precio + (precio * impuesto);
};

console.log(\`Total a pagar: $\${calcularTotal(100)}\`);
\`\`\``
          }
        ]
      },
      {
        id: 202,
        course: 2,
        order: 2,
        title: 'Módulo 2: DOM, Eventos y Asincronía Fetch',
        description: 'Interacción dinámica con páginas web y conexión a servidores web.',
        lessons: [
          {
            id: 2003,
            module: 202,
            order: 1,
            title: '2.1 Manipulación del DOM y Event Listeners',
            duration_seconds: 700,
            video_url: 'https://www.youtube.com/embed/17b2pL3KqY4',
            content_text: `Cómo seleccionar elementos del HTML y escuchar interacciones de usuario.

\`\`\`javascript
const boton = document.querySelector('#btn-guardar');
boton.addEventListener('click', () => {
  alert('¡Datos guardados con éxito!');
});
\`\`\``
          },
          {
            id: 2004,
            module: 202,
            order: 2,
            title: '2.2 Asincronía con Async / Await y Fetch API',
            duration_seconds: 850,
            video_url: 'https://www.youtube.com/embed/vn3tm0quoqE',
            content_text: `Consumo de servicios web REST con peticiones asíncronas.

\`\`\`javascript
async function obtenerCursos() {
  try {
    const respuesta = await fetch('/api/courses/');
    const datos = await respuesta.json();
    console.log(datos);
  } catch (error) {
    console.error('Error al conectar con la API:', error);
  }
}
\`\`\``
          }
        ]
      }
    ]
  },

  // Course 3: Bash & Terminal
  terminal: {
    cover_image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=1200&auto=format&fit=crop',
    description: 'Domina la consola de comandos de Linux y macOS. Navegación en sistema de archivos, permisos, tuberías (pipes), scripts en Bash y productividad para desarrolladores.',
    modules: [
      {
        id: 301,
        course: 3,
        order: 1,
        title: 'Módulo 1: Consola de Comandos y Gestión de Archivos',
        description: 'Comandos fundamentales para la línea de comandos en UNIX / Linux.',
        lessons: [
          {
            id: 3001,
            module: 301,
            order: 1,
            title: '1.1 Navegación por el Sistema de Archivos (pwd, ls, cd)',
            duration_seconds: 450,
            video_url: 'https://www.youtube.com/embed/oxuRxtCjEA8',
            content_text: `Aprende a navegar rápidamente por directorios utilizando la consola.

\`\`\`bash
# Mostrar directorio actual
pwd

# Listar archivos detalladamente
ls -l -a

# Cambiar de directorio
cd /var/www/html
\`\`\``
          },
          {
            id: 3002,
            module: 301,
            order: 2,
            title: '1.2 Creación, Edición y Permisos de Archivos',
            duration_seconds: 600,
            video_url: 'https://www.youtube.com/embed/2pgvy-4ZlYw',
            content_text: `Administración de permisos de lectura, escritura y ejecución.

\`\`\`bash
# Dar permisos de ejecución a un script
chmod +x deploy.sh

# Cambiar propietario de un archivo
sudo chown usuario:grupo script.sh
\`\`\``
          }
        ]
      }
    ]
  },

  // Course 4: Git & GitHub
  git: {
    cover_image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?q=80&w=1200&auto=format&fit=crop',
    description: 'Domina el flujo de trabajo profesional con Git y GitHub. Control de cambios, ramas (branches), fusiones (merge, rebase), resolución de conflictos y GitHub Pull Requests.',
    modules: [
      {
        id: 401,
        course: 4,
        order: 1,
        title: 'Módulo 1: Control de Versiones con Git',
        description: 'Commits, ramas y trabajo colaborativo.',
        lessons: [
          {
            id: 4001,
            module: 401,
            order: 1,
            title: '1.1 Flujo de Trabajo Básico con Git',
            duration_seconds: 520,
            video_url: 'https://www.youtube.com/embed/3GymExBkKjE',
            content_text: `Configura tu identidad en Git y realiza tu primer commit.

\`\`\`bash
git config --global user.name "Alex López"
git config --global user.email "alex@ejemplo.com"

git init
git add .
git commit -m "feat: mi primer commit profesional"
\`\`\``
          },
          {
            id: 4002,
            module: 401,
            order: 2,
            title: '1.2 Ramas, Merges y Resolución de Conflictos',
            duration_seconds: 680,
            video_url: 'https://www.youtube.com/embed/e2IbNHi4uCI',
            content_text: `Aprende a trabajar con ramas de características (feature branches) sin romper la rama principal.

\`\`\`bash
git checkout -b feature/login-page
git push origin feature/login-page
\`\`\``
          }
        ]
      }
    ]
  },

  // Course 5: SQL & Databases
  sql: {
    cover_image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format&fit=crop',
    description: 'Aprende el diseño relacional de bases de datos y el lenguaje SQL. Consultas complejas con JOINs, funciones de agregación, índices, llaves primarias y foráneas con PostgreSQL/MySQL.',
    modules: [
      {
        id: 501,
        course: 5,
        order: 1,
        title: 'Módulo 1: Fundamentos de SQL y DDL',
        description: 'Creación de tablas, llaves primarias y foráneas.',
        lessons: [
          {
            id: 5001,
            module: 501,
            order: 1,
            title: '1.1 Creación de Tablas y Relaciones SQL',
            duration_seconds: 580,
            video_url: 'https://www.youtube.com/embed/uUdKAYl-F7g',
            content_text: `Diseña e implementa tablas relacionales con SQL.

\`\`\`sql
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\``
          },
          {
            id: 5002,
            module: 501,
            order: 2,
            title: '1.2 Consultas Avanzadas con JOINs y Agregaciones',
            duration_seconds: 750,
            video_url: 'https://www.youtube.com/embed/7Vtl22_kRmg',
            content_text: `Unión de tablas con INNER JOIN y agregaciones.

\`\`\`sql
SELECT c.nombre AS curso, COUNT(e.id) AS total_estudiantes
FROM cursos c
INNER JOIN inscripciones e ON c.id = e.curso_id
GROUP BY c.id, c.nombre
ORDER BY total_estudiantes DESC;
\`\`\``
          }
        ]
      }
    ]
  }
};

/**
 * Utility function to enrich any course from backend or fallback
 */
export function enrichCourseData(course: Course): Course {
  const titleLower = course.title.toLowerCase();
  const slugLower = (course.slug || '').toLowerCase();

  let seedKey = 'python';
  if (titleLower.includes('script') || titleLower.includes('js') || slugLower.includes('js')) {
    seedKey = 'javascript';
  } else if (titleLower.includes('bash') || titleLower.includes('terminal') || slugLower.includes('terminal')) {
    seedKey = 'terminal';
  } else if (titleLower.includes('git') || slugLower.includes('git')) {
    seedKey = 'git';
  } else if (titleLower.includes('sql') || titleLower.includes('base') || slugLower.includes('sql')) {
    seedKey = 'sql';
  }

  const seed = COURSE_SEED_DETAILS[seedKey];

  return {
    ...course,
    cover_image: course.cover_image || seed.cover_image,
    description: course.description && course.description.length > 20 ? course.description : seed.description,
    modules: course.modules && course.modules.length > 0 ? course.modules : seed.modules
  };
}

/**
 * Generate full seed course for any ID if backend returns 403 or 404
 */
export function getFallbackCourse(id: number): Course {
  const seedKeys = Object.keys(COURSE_SEED_DETAILS);
  const keyIndex = Math.abs(id - 1) % seedKeys.length;
  const seedKey = seedKeys[keyIndex] || 'python';
  const seed = COURSE_SEED_DETAILS[seedKey];

  const titles: Record<number, string> = {
    1: 'Python 3: Desde Cero hasta Inteligencia Artificial',
    2: 'React 19 & TypeScript: Guía Práctica Fullstack',
    3: 'Docker & DevOps: Contenedores y CI/CD',
    4: 'Bases de Datos SQL: PostgreSQL y Consultas Avanzadas',
    5: 'Git & GitHub: Control de Versiones y Trabajo en Equipo',
    6: 'JavaScript Moderno ES6+: Asincronía y Promesas',
  };

  const title = titles[id] || `Curso #${id}: Desarrollo de Software Avanzado`;

  return {
    id: id,
    title: title,
    slug: `curso-${id}`,
    price: id % 2 === 0 ? '19.99' : '0.00',
    cover_image: seed.cover_image,
    category: 1,
    category_name: 'Programación & DevOps',
    professor_name: 'Prof. Alex López',
    is_active: true,
    modules_count: seed.modules.length,
    created_at: new Date().toISOString(),
    description: seed.description,
    modules: seed.modules.map((mod) => ({
      ...mod,
      course: id,
    })),
  };
}

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
          }
        ]
      }
    ]
  },

  // Course 5: PostgreSQL: Optimización de Consultas y Modelado (COMPLETO 100%)
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
            content_text: `### 📚 Manual Teórico-Práctico: Modelo Entidad-Relación y Normalización en PostgreSQL

Bienvenido a la primera guía de estudio del curso de **PostgreSQL Avanzado**. En este tema aprenderás los principios fundamentales de diseño relacional para garantizar la integridad de datos, eliminar redundancias y estructurar tablas altamente escalables.

---

#### 1. Principios de Normalización de Bases de Datos
La normalización es el proceso de estructurar una base de datos relacional para reducir la duplicidad de información y evitar anomalías de inserción, actualización y borrado.

- **Primera Forma Normal (1FN):** Eliminación de grupos repetidos. Cada columna debe contener un valor atómico único.
- **Segunda Forma Normal (2FN):** Cumplir 1FN y asegurar que cada atributo no-clave dependa totalmente de la llave primaria completa.
- **Tercera Forma Normal (3FN):** Cumplir 2FN y eliminar dependencias transitivas (ningún atributo no-clave debe depender de otro atributo no-clave).

---

#### 2. Esquema DDL SQL del Sistema OnCourses

A continuación implementamos el diseño relacional optimizado en PostgreSQL:

\`\`\`sql
-- Crear tabla de usuarios/estudiantes
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    rol VARCHAR(20) DEFAULT 'student' CHECK (rol IN ('student', 'professor', 'admin')),
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de cursos
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    descripcion TEXT,
    profesor_id INT REFERENCES usuarios(id) ON DELETE SET NULL,
    activo BOOLEAN DEFAULT true,
    creado_en TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de inscripciones/matrículas
CREATE TABLE matriculas (
    id SERIAL PRIMARY KEY,
    estudiante_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    total_progreso NUMERIC(5, 2) DEFAULT 0.00 CHECK (total_progreso BETWEEN 0 AND 100),
    fecha_inscripcion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_estudiante_curso UNIQUE (estudiante_id, curso_id)
);
\`\`\`

---

#### 💡 Tabla de Resumen de Restricciones en PostgreSQL

| Restricción SQL | Propósito | Ejemplo en PostgreSQL |
| --- | --- | --- |
| \`PRIMARY KEY\` | Identificador único de fila | \`id SERIAL PRIMARY KEY\` |
| \`FOREIGN KEY\` | Garantiza integridad referencial | \`REFERENCES usuarios(id)\` |
| \`UNIQUE\` | Impide valores duplicados | \`email VARCHAR(150) UNIQUE\` |
| \`CHECK\` | Valida reglas de negocio | \`CHECK (precio >= 0)\` |
| \`DEFAULT\` | Asigna valor automático | \`DEFAULT CURRENT_TIMESTAMP\` |

---

#### ✏️ Ejercicio Práctico Obligatorio
1. Abre tu cliente PostgreSQL (psql, pgAdmin o DBeaver) y ejecuta los comandos DDL anteriores.
2. Inserte 3 usuarios y 2 cursos de prueba.
3. Comprueba que al intentar registrar un email duplicado o un precio negativo, PostgreSQL bloquee la operación lanzando una excepción de restricción.`,
            resources: ['https://www.postgresql.org/docs/current/ddl.html']
          },
          {
            id: 5002,
            module: 501,
            order: 2,
            title: 'Lección 1.2: Tipos de Datos Avanzados en PostgreSQL (JSONB, UUID, TIMESTAMPTZ)',
            duration_seconds: 1050,
            content_text: `### 🛠️ Manual de Estudio: Tipos de Datos Avanzados en PostgreSQL

PostgreSQL es conocido como la base de datos relacional orientada a objetos más potente del mundo. Una de sus mayores fortalezas es su soporte nativo para tipos de datos modernos que van más allá del SQL tradicional.

---

#### 1. Datos Semi-estructurados con JSONB
A diferencia del tipo \`JSON\` plano (que almacena texto exacto), el tipo **\`JSONB\`** almacena los datos en formato binario descompuesto. Esto permite búsquedas ultra rápidas e indexación especializada mediante índices GIN.

\`\`\`sql
-- Crear tabla con metadatos flexibes en JSONB
CREATE TABLE lecciones_detalles (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    metadatos JSONB DEFAULT '{}'::jsonb
);

-- Insertar datos estructurados en formato JSONB
INSERT INTO lecciones_detalles (titulo, metadatos) VALUES
('Creación de Índices', '{"duracion_min": 15, "nivel": "avanzado", "etiquetas": ["sql", "performance", "indexes"]}'),
('Modelado B-Tree', '{"duracion_min": 20, "nivel": "intermedio", "etiquetas": ["postgres", "btree"]}');

-- Consulta con operadores JSONB (->> extraer como texto, @> contiene JSON)
SELECT titulo, metadatos->>'nivel' AS nivel_leccion
FROM lecciones_detalles
WHERE metadatos @> '{"nivel": "avanzado"}';
\`\`\`

---

#### 2. Identificadores Únicos Globales (UUID v4)
Para sistemas distribuidos o APIs donde no se deben exponer IDs secuenciales simples (1, 2, 3...), PostgreSQL permite generar **UUIDs** de 128 bits:

\`\`\`sql
-- Habilitar extensión para generación de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE pagos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    monto NUMERIC(10, 2) NOT NULL,
    moneda VARCHAR(3) DEFAULT 'USD',
    fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pagos (monto) VALUES (9.99);
SELECT * FROM pagos;
\`\`\`

---

#### 📊 Comparativa: JSON vs JSONB

| Característica | Tipo \`JSON\` | Tipo \`JSONB\` (Recomendado) |
| --- | --- | --- |
| Almacenamiento | Texto plano tal como se ingresó | Formato binario procesado |
| Velocidad de Inserción | Más rápida (no procesa) | Ligeramente más lenta por procesamiento |
| Velocidad de Consulta | Más lenta (reparsea en cada query) | **Ultra rápida (acceso binario directo)** |
| Soporte de Índices | No soporta índices GIN | **Soporta Índices GIN y GiST** |`,
            resources: ['https://www.postgresql.org/docs/current/datatype-json.html']
          },
          {
            id: 5003,
            module: 501,
            order: 3,
            title: 'Lección 1.3: Integridad Referencial y Acciones en Cascada (ON DELETE CASCADE)',
            duration_seconds: 840,
            content_text: `### 🛡️ Manual Práctico: Integridad Referencial y Acciones en Cascada

Garantizar que las relaciones entre tablas nunca queden "huérfanas" es el pilar de la integridad referencial en PostgreSQL. En esta guía dominarás el uso de reglas en la eliminación y actualización de registros.

---

#### 1. Tipos de Acciones de Llave Foránea

- **\`ON DELETE CASCADE\`:** Si se elimina el registro padre, PostgreSQL borra automáticamente todas las filas hijas vinculadas.
- **\`ON DELETE SET NULL\`:** Si se elimina el padre, las llaves foráneas en los hijos cambian a \`NULL\`.
- **\`ON DELETE RESTRICT\` (Default):** Impide eliminar el registro padre si existen registros hijos que dependen de él.

\`\`\`sql
-- Ejemplo completo de integridad referencial
CREATE TABLE secciones (
    id SERIAL PRIMARY KEY,
    curso_id INT NOT NULL REFERENCES cursos(id) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL
);

CREATE TABLE lecciones (
    id SERIAL PRIMARY KEY,
    seccion_id INT NOT NULL REFERENCES secciones(id) ON DELETE CASCADE,
    titulo VARCHAR(150) NOT NULL,
    video_url TEXT
);
\`\`\`

#### ✏️ Ejercicio de Verificación
Prueba borrar un curso completo con \`DELETE FROM cursos WHERE id = 1;\` y verifica con \`SELECT * FROM secciones;\` cómo PostgreSQL elimina automáticamente las secciones y lecciones hijas asociadas en cascada.`,
            resources: ['https://www.postgresql.org/docs/current/ddl-constraints.html']
          }
        ]
      },
      {
        id: 502,
        course: 5,
        order: 2,
        title: 'Módulo 2: Optimización de Consultas SQL y Estrategias de Indexación B-Tree & GIN',
        description: 'Técnicas avanzadas de optimización de rendimiento, análisis con EXPLAIN ANALYZE y diseño de índices eficientes.',
        lessons: [
          {
            id: 5004,
            module: 502,
            order: 1,
            title: 'Lección 2.1: Creación de Índices e Indexación B-Tree (EXPLAIN ANALYZE)',
            duration_seconds: 1200,
            content_text: `### ⚡ Manual Avanzado: Indexación B-Tree y Análisis de Rendimiento con EXPLAIN ANALYZE

Cuando las tablas en producción crecen a cientos de miles o millones de filas, las consultas sin índices adecuados obligan a PostgreSQL a realizar escaneos secuenciales completos (\`Sequential Scan\`), causando cuellos de botella y alta latencia.

---

#### 1. ¿Cómo funciona un Índice B-Tree?
El índice **B-Tree (Balanced Tree)** es la estructura por defecto en PostgreSQL. Mantiene los datos de la columna ordenados en un árbol balanceado, reduciendo la complejidad de búsqueda de $O(N)$ a $O(log N)$.

---

#### 2. Diagnóstico con EXPLAIN ANALYZE

La herramienta nativa \`EXPLAIN ANALYZE\` ejecuta la consulta y retorna el plan exacto del optimizador de PostgreSQL:

\`\`\`sql
-- Analizar el costo de una consulta sin índice
EXPLAIN (ANALYZE, BUFFERS, VERBOSE)
SELECT * FROM usuarios
WHERE email = 'estudiante100@oncourses.app';
\`\`\`

#### Salida del Planificador (Sin Índice):
\`\`\`text
Seq Scan on usuarios  (cost=0.00..1850.00 rows=1 width=120) (actual time=14.230..14.232 rows=1 loops=1)
  Filter: ((email)::text = 'estudiante100@oncourses.app'::text)
  Buffers: shared read=1240
Planning Time: 0.115 ms
Execution Time: 14.260 ms
\`\`\`

---

#### 3. Creación del Índice B-Tree

\`\`\`sql
-- Crear índice B-Tree sobre la columna de correo
CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Re-ejecutar el análisis de la consulta
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM usuarios
WHERE email = 'estudiante100@oncourses.app';
\`\`\`

#### Salida del Planificador (Con Índice B-Tree):
\`\`\`text
Index Scan using idx_usuarios_email on usuarios  (cost=0.28..8.30 rows=1 width=120) (actual time=0.045..0.047 rows=1 loops=1)
  Index Cond: ((email)::text = 'estudiante100@oncourses.app'::text)
  Buffers: shared hit=3
Planning Time: 0.082 ms
Execution Time: 0.065 ms
\`\`\`

---

#### 📊 Comparativa de Rendimiento

| Métricas de Ejecución | Sin Índice (Seq Scan) | Con Índice B-Tree (Index Scan) | Mejora de Rendimiento |
| --- | --- | --- | --- |
| **Tiempo de Ejecución** | 14.26 ms | **0.065 ms** | **¡219 veces más rápido!** |
| **Bloques Leídos (Buffers)** | 1240 shared read | **3 shared hit** | **99.7% menos uso de I/O** |
| **Costo Estimado** | 1850.00 | **8.30** | **Costo mínimo** |`,
            resources: ['https://www.postgresql.org/docs/current/using-explain.html']
          },
          {
            id: 5005,
            module: 502,
            order: 2,
            title: 'Lección 2.2: Índices Parciales, Expresiones e Índices Compuestos',
            duration_seconds: 1100,
            content_text: `### 🎯 Manual de Estudio: Índices Parciales, Compuestos y Expresiones

Crear índices sobre todas las columnas de una tabla es un error común que degrada el rendimiento de las operaciones de inserción (\`INSERT\`) y actualización (\`UPDATE\`). En esta guía aprenderás a diseñar índices inteligentes y compactos.

---

#### 1. Índices Parciales (Partial Indexes)
Un índice parcial indexa únicamente un subconjunto de filas que cumplen una condición \`WHERE\`. Reduce drásticamente el espacio en disco y el uso de memoria RAM.

\`\`\`sql
-- Indexar solo los usuarios con rol activo de administradores
CREATE INDEX idx_usuarios_admins_activos 
ON usuarios (id) 
WHERE rol = 'admin' AND activo = true;
\`\`\`

---

#### 2. Índices de Expresión (Expression Indexes)
Si realizas búsquedas insensibles a mayúsculas como \`LOWER(email)\`, un índice normal sobre \`email\` no se utilizará. Debes crear un índice de expresión:

\`\`\`sql
-- Crear índice sobre la función LOWER()
CREATE INDEX idx_usuarios_lower_email ON usuarios (LOWER(email));

-- Consulta optimizada
SELECT * FROM usuarios WHERE LOWER(email) = 'alex@oncourses.app';
\`\`\`

---

#### 3. Índices Compuestos (Multi-Column Indexes)
Para consultas que filtran por múltiples columnas frecuentemente:

\`\`\`sql
-- Índice compuesto en (curso_id, total_progreso)
CREATE INDEX idx_matriculas_curso_progreso 
ON matriculas (curso_id, total_progreso DESC);

SELECT * FROM matriculas 
WHERE curso_id = 5 
ORDER BY total_progreso DESC;
\`\`\``,
            resources: ['https://www.postgresql.org/docs/current/indexes-partial.html']
          },
          {
            id: 5006,
            module: 502,
            order: 3,
            title: 'Lección 2.3: Optimización de JOINs Complejos y Subconsultas CTE (WITH)',
            duration_seconds: 1000,
            content_text: `### 🔗 Manual Práctico: JOINs Complejos y Common Table Expressions (CTE)

Aprende a estructurar consultas complejas mantenibles utilizando expresiones de tabla comunes (\`WITH\`) y optimizar los algoritmos de unión de PostgreSQL (\`Nested Loop\`, \`Hash Join\`, \`Merge Join\`).

---

#### 1. Ejemplo de Consulta CTE con Agregaciones

\`\`\`sql
-- Obtener el ranking de estudiantes con mayor avance por curso
WITH avance_estudiantes AS (
    SELECT 
        u.id AS estudiante_id,
        u.nombre,
        c.titulo AS curso,
        m.total_progreso,
        RANK() OVER (PARTITION BY c.id ORDER BY m.total_progreso DESC) AS posicion
    FROM usuarios u
    INNER JOIN matriculas m ON u.id = m.estudiante_id
    INNER JOIN cursos c ON c.id = m.curso_id
)
SELECT * 
FROM avance_estudiantes 
WHERE posicion <= 3;
\`\`\``,
            resources: ['https://www.postgresql.org/docs/current/queries-with.html']
          }
        ]
      },
      {
        id: 503,
        course: 5,
        order: 3,
        title: 'Módulo 3: Transacciones, Concurrencia ACID/MVCC y Mantenimiento del Sistema',
        description: 'Control de transacciones en PostgreSQL, arquitectura MVCC, prevención de bloat con VACUUM y proyecto práctico integrador.',
        lessons: [
          {
            id: 5007,
            module: 503,
            order: 1,
            title: 'Lección 3.1: Control de Concurrencia y Niveles de Aislamiento (ACID & MVCC)',
            duration_seconds: 950,
            content_text: `### 🔒 Manual Teórico-Práctico: Transacciones ACID y Arquitectura MVCC en PostgreSQL

PostgreSQL garantiza la consistencia de datos incluso ante fallos del sistema o accesos simultáneos de miles de usuarios mediante el estándar **ACID** y la arquitectura **MVCC (Multi-Version Concurrency Control)**.

---

#### 1. Garantías ACID en Transacciones

- **Atomicidad (A):** O todo se ejecuta con éxito, o todo se revierte (\`ROLLBACK\`).
- **Consistencia (C):** La base de datos pasa de un estado válido a otro manteniendo todas las restricciones.
- **Aislamiento (I):** Las transacciones concurrentes no interfieren entre sí.
- **Durabilidad (D):** Los cambios confirmados (\`COMMIT\`) se persisten en el registro Write-Ahead Log (WAL).

---

#### 2. Ejemplo Práctico de Transacción de Pago de Curso

\`\`\`sql
-- Iniciar bloque transaccional seguro
BEGIN;

-- 1. Descontar cupo o registrar el pago
INSERT INTO pagos (monto, moneda) VALUES (9.99, 'USD');

-- 2. Registrar la matrícula del alumno
INSERT INTO matriculas (estudiante_id, curso_id, total_progreso) 
VALUES (10, 5, 0.00);

-- Confirmar todos los cambios atómicamente
COMMIT;
\`\`\`

#### En caso de error inesperado:
\`\`\`sql
-- Revertir todos los cambios efectuados durante el bloque
ROLLBACK;
\`\`\``,
            resources: ['https://www.postgresql.org/docs/current/mvcc.html']
          },
          {
            id: 5008,
            module: 503,
            order: 2,
            title: 'Lección 3.2: Mantenimiento Preventivo: VACUUM, ANALYZE y Reindexación',
            duration_seconds: 900,
            content_text: `### 🧹 Manual Práctico: Mantenimiento del Sistema con VACUUM y ANALYZE

Debido a la arquitectura MVCC de PostgreSQL, cuando se ejecuta un \`UPDATE\` o \`DELETE\`, las filas antiguas no se borran físicamente al instante; quedan marcadas como "filas muertas" (dead tuples). Si no se limpia este espacio, se genera hinchamiento de tablas (**table bloat**).

---

#### 1. Comando \`VACUUM\` y \`ANALYZE\`

- **\`VACUUM\`:** Reclama el espacio ocupado por filas muertas para que pueda ser reutilizado por nuevas inserciones.
- **\`ANALYZE\`:** Actualiza las estadísticas del optimizador de consultas para que elija los mejores planes de ejecución.
- **\`VACUUM ANALYZE\`:** Combina ambas tareas de mantenimiento de forma no bloqueante.

\`\`\`sql
-- Ejecutar mantenimiento preventivo sobre la tabla de matrículas
VACUUM (VERBOSE, ANALYZE) matriculas;

-- Reindexar tablas para desfragmentar índices B-Tree
REINDEX TABLE matriculas;
\`\`\`

---

#### 📊 Estadísticas de Filas Muertas en PostgreSQL

\`\`\`sql
-- Consulta administrativa para detectar hinchamiento (bloat)
SELECT 
    relname AS tabla,
    n_dead_tup AS filas_muertas,
    n_live_tup AS filas_vivas,
    last_vacuum,
    last_autovacuum
FROM pg_stat_user_tables
ORDER BY n_dead_tup DESC;
\`\`\``,
            resources: ['https://www.postgresql.org/docs/current/sql-vacuum.html']
          },
          {
            id: 5009,
            module: 503,
            order: 3,
            title: 'Lección 3.3: Proyecto Integrador: Optimización de Rendimiento en Caso de Estudio Real',
            duration_seconds: 1500,
            content_text: `### 🚀 Proyecto Integrador: Optimización de Consultas en Producción

En esta lección integradora aplicarás todo el conocimiento adquirido en el curso para resolver un caso de estudio real de optimización de rendimiento en una plataforma de educación online.

---

#### 🎯 El Problema de Producción
La consulta del reporte mensual de ingresos y matrículas por curso tarda **4.2 segundos** en ejecutarse, provocando tiempos de espera en la aplicación web y timeout en reportes.

#### Consulta Lenta Original:
\`\`\`sql
SELECT 
    c.titulo,
    COUNT(m.id) AS total_matriculados,
    SUM(c.precio) AS ingresos_totales
FROM cursos c
LEFT JOIN matriculas m ON c.id = m.curso_id
WHERE LOWER(c.categoria_name) = 'programación & devops'
GROUP BY c.id, c.titulo
ORDER BY ingresos_totales DESC;
\`\`\`

---

#### 🛠️ Plan de Optimización Aplicado

1. **Creación de Índice Parcial y Expresión:**
\`\`\`sql
CREATE INDEX idx_cursos_cat_lower ON cursos (LOWER(categoria_name));
CREATE INDEX idx_matriculas_curso_id ON matriculas (curso_id);
\`\`\`

2. **Reescritura de Consulta con CTE Agregada:**
\`\`\`sql
WITH matriculas_resumen AS (
    SELECT curso_id, COUNT(id) AS total_matriculados
    FROM matriculas
    GROUP BY curso_id
)
SELECT 
    c.titulo,
    COALESCE(mr.total_matriculados, 0) AS total_matriculados,
    (COALESCE(mr.total_matriculados, 0) * c.precio) AS ingresos_totales
FROM cursos c
LEFT JOIN matriculas_resumen mr ON c.id = mr.curso_id
WHERE LOWER(c.categoria_name) = 'programación & devops'
ORDER BY ingresos_totales DESC;
\`\`\`

---

#### 🏁 Resultado Final Obtenido

- **Tiempo Original:** 4,200 ms (4.2 segundos).
- **Tiempo Optimizado:** **12 ms (0.012 segundos)**.
- **Reducción de Tiempo:** **¡99.7% más rápido!**

#### 🏆 ¡Felicidades!
Has completado el curso práctico completo de **PostgreSQL: Optimización de Consultas y Modelado**. Puedes marcar esta lección como completada para recibir tu certificación.`,
            resources: ['https://www.postgresql.org/docs/current/performance-tips.html']
          }
        ]
      }
    ]
  }
};

// Aliases for seed lookup
COURSE_SEED_DETAILS.sql = COURSE_SEED_DETAILS.postgresql;

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
  } else if (
    titleLower.includes('sql') ||
    titleLower.includes('postgres') ||
    titleLower.includes('base') ||
    slugLower.includes('sql') ||
    slugLower.includes('postgres') ||
    course.id === 5
  ) {
    seedKey = 'postgresql';
  }

  const seed = COURSE_SEED_DETAILS[seedKey] || COURSE_SEED_DETAILS.postgresql;

  // Prefer seed.modules if backend has fewer modules than seed (e.g. 1 module vs 3 modules)
  const sourceModules =
    course.modules && course.modules.length >= seed.modules.length ? course.modules : seed.modules;

  const cleanedModules = sourceModules.map((mod) => ({
    ...mod,
    course: course.id,
    lessons: (mod.lessons || []).map((les) => ({
      ...les,
      video_url: (les.video_url || '').includes('kUMe1FH4CHE') ? '' : les.video_url,
    })),
  }));

  return {
    ...course,
    cover_image: course.cover_image || seed.cover_image,
    description: course.description && course.description.length > 20 ? course.description : seed.description,
    modules: cleanedModules,
  };
}

/**
 * Generate full seed course for any ID if backend returns 403 or 404
 */
export function getFallbackCourse(id: number): Course {
  const titles: Record<number, string> = {
    1: 'Python 3: Desde Cero hasta Inteligencia Artificial',
    2: 'JavaScript Moderno ES6+: Asincronía y DOM',
    3: 'Terminal Bash & Consola Linux: Guía Profesional',
    4: 'Git & GitHub: Control de Versiones en Equipo',
    5: 'PostgreSQL: Optimización de Consultas y Modelado',
    6: 'Fundamento de Bases de Datos - SQL',
  };

  const title = titles[id] || `PostgreSQL: Optimización de Consultas y Modelado (Curso #${id})`;
  const seedKey = id === 1 ? 'python' : 'postgresql';
  const seed = COURSE_SEED_DETAILS[seedKey] || COURSE_SEED_DETAILS.postgresql;

  return {
    id: id,
    title: title,
    slug: `curso-${id}`,
    price: id % 2 === 0 ? '19.99' : '9.99',
    cover_image: seed.cover_image,
    category: 1,
    category_name: 'Bases de Datos & SQL',
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

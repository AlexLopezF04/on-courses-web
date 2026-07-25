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

  // Course 2: React 19 & Next.js 15: Guía Práctica Fullstack (COMPLETO 100%)
  react: {
    cover_image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en desarrollo web moderno con React 19 y Next.js 15 App Router. Domina la arquitectura de React Server Components (RSC), mutaciones con Server Actions, estilizado de alto rendimiento con TailwindCSS v4, autenticación segura y despliegue continuo en Vercel.',
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
            content_text: `### ⚛️ Manual Teórico-Práctico: React 19 y la Era del React Compiler

Bienvenido a la primera guía de estudio del curso de **React 19 & Next.js 15**. En este tema aprenderás las novedades fundamentales de React 19, la eliminación de la memoización manual (\`useMemo\` / \`useCallback\`) gracias al nuevo **React Compiler** y la sintaxis JSX.

---

#### 1. ¿Qué cambia en React 19?

- **React Compiler Automático:** Transforma el código JSX en código optimizado en tiempo de compilación. Ya no necesitas memorizar callbacks o valores con \`useCallback\` o \`useMemo\` manualmente.
- **Server Components por Defecto:** Los componentes se ejecutan en el servidor de Node.js por defecto, reduciendo el peso del JavaScript cliente a 0kb para páginas estáticas.
- **Nuevos Hooks de Formulario:** Soporte nativo para \`useActionState\`, \`useFormStatus\` y \`useOptimistic\`.

---

#### 2. Tu Primer Componente en React 19

\`\`\`tsx
// Componente de Servidor por defecto (RSC)
import React from 'react';

interface TarjetaCursoProps {
  titulo: string;
  precio: number;
}

export const TarjetaCurso: React.FC<TarjetaCursoProps> = ({ titulo, precio }) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <span className="text-xs font-mono font-bold text-emerald-500 uppercase">React 19 & Next.js 15</span>
      <h3 className="text-xl font-black text-slate-950 dark:text-white mt-1">{titulo}</h3>
      <p className="text-sm font-bold text-slate-600 dark:text-slate-300 mt-2">
        Inversión: <span className="text-emerald-500 font-extrabold">\${precio} USD</span>
      </p>
    </div>
  );
};
\`\`\`

---

#### 💡 Resumen de Cambios en React 19

| Característica | React 18 (Anterior) | React 19 (Actual) |
| --- | --- | --- |
| Memoización | Manual (\`useMemo\`, \`useCallback\`) | **Automática vía React Compiler** |
| Acceso a Promesas | Requiere \`useEffect\` + \`useState\` | **Hook \`use()\` directo en render** |
| Formularios | Manejo imperativo de estado | **Server Actions + \`useActionState\`** |
| Refs en Props | Requería \`forwardRef\` | **\`ref\` es una prop normal** |`,
            resources: ['https://react.dev/blog/2024/04/25/react-19']
          },
          {
            id: 2002,
            module: 201,
            order: 2,
            title: 'Lección 1.2: Hooks Esenciales (useState, useEffect, useActionState, useFormStatus)',
            duration_seconds: 1050,
            content_text: `### 🛠️ Manual de Estudio: Hooks de Estado y Manejo de Formularios en React 19

Aprende a gestionar el estado cliente con **\`useState\`** y a dominar los nuevos hooks de React 19 diseñados para formularios interactivos.

---

#### 1. Ejemplo de Formulario Interactivo con \`useActionState\`

\`\`\`tsx
'use client';

import React, { useActionState } from 'react';

async function actualizarPerfilAction(previousState: any, formData: FormData) {
  const nombre = formData.get('nombre') as string;
  if (!nombre || nombre.length < 3) {
    return { error: 'El nombre debe tener al menos 3 caracteres.' };
  }
  return { success: \`Perfil actualizado con éxito para \${nombre}\` };
}

export function FormularioPerfil() {
  const [state, formAction, isPending] = useActionState(actualizarPerfilAction, null);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label className="block text-xs font-bold uppercase">Nombre Completo</label>
        <input 
          name="nombre" 
          type="text" 
          className="w-full p-2 border-2 border-slate-950" 
          placeholder="Alex López"
        />
      </div>
      <button 
        type="submit" 
        disabled={isPending}
        className="px-4 py-2 bg-emerald-500 text-slate-950 font-black border-2 border-slate-950"
      >
        {isPending ? 'Guardando...' : 'Guardar Cambios'}
      </button>
      {state?.error && <p className="text-red-500 text-xs font-bold">{state.error}</p>}
      {state?.success && <p className="text-emerald-500 text-xs font-bold">{state.success}</p>}
    </form>
  );
}
\`\`\``,
            resources: ['https://react.dev/reference/react/useActionState']
          },
          {
            id: 2003,
            module: 201,
            order: 3,
            title: 'Lección 1.3: Componentes de Servidor vs Componentes de Cliente (\'use client\')',
            duration_seconds: 960,
            content_text: `### ⚡ Manual Práctico: Server Components (RSC) vs Client Components

En React 19 y Next.js 15, la arquitectura se divide limpiamente entre el Servidor (Node.js) y el Cliente (Navegador).

---

#### 1. ¿Cuándo usar cada tipo de componente?

- **Server Component (Default):** Para fetching de datos directo a base de datos, acceso a secretos API de backend y renderizado HTML estático.
- **Client Component (\`'use client'\`):** Para elementos interactivos que requieren event listeners (\`onClick\`, \`onChange\`), hooks de React (\`useState\`, \`useEffect\`) o APIs del navegador (\`localStorage\`).`,
            resources: ['https://nextjs.org/docs/app/building-your-application/rendering/server-components']
          }
        ]
      },
      {
        id: 202,
        course: 2,
        order: 2,
        title: 'Módulo 2: Arquitectura Fullstack con Next.js 15 App Router y Server Actions',
        description: 'Enrutamiento basado en archivos, componentes de maquetación (Layouts), Server Actions y TailwindCSS v4.',
        lessons: [
          {
            id: 2004,
            module: 202,
            order: 1,
            title: 'Lección 2.1: Enrutamiento Basado en Archivos en Next.js 15 (App Router, Layouts, Page)',
            duration_seconds: 1100,
            content_text: `### 🧭 Manual Avanzado: Next.js 15 App Router

El **App Router** de Next.js 15 utiliza la estructura de carpetas dentro del directorio \`app/\` para definir las rutas públicas de la aplicación web.

---

#### 1. Convención de Archivos Especiales

- **\`page.tsx\`:** UI única expuesta en una URL pública.
- **\`layout.tsx\`:** Estructura compartida que envuelve a las páginas hijas (mantiene el estado durante la navegación).
- **\`loading.tsx\`:** Pantalla de carga automática envuelta en \`React.Suspense\`.
- **\`error.tsx\`:** Límite de captura de errores envuelto en \`ErrorBoundary\`.

\`\`\`tsx
// app/cursos/[id]/page.tsx
import React from 'react';

interface Params {
  params: Promise<{ id: string }>;
}

export default async function PaginaCurso({ params }: Params) {
  const { id } = await params;
  return (
    <div className="p-8">
      <h1 className="text-2xl font-black">Detalle del Curso #{id}</h1>
    </div>
  );
}
\`\`\``,
            resources: ['https://nextjs.org/docs/app/building-your-application/routing']
          },
          {
            id: 2005,
            module: 202,
            order: 2,
            title: 'Lección 2.2: Server Actions y Mutación de Datos de Formulario en Next.js 15',
            duration_seconds: 1250,
            content_text: `### 🚀 Manual de Estudio: Server Actions y Revalidación de Caché

Las **Server Actions** son funciones asíncronas que se ejecutan directamente en el servidor sin necesidad de crear endpoints API manuales (\`pages/api\`).

\`\`\`tsx
// app/actions/cursos.ts
'use server';

import { revalidatePath } from 'next/cache';

export async function crearCursoAction(formData: FormData) {
  const titulo = formData.get('titulo') as string;
  const precio = formData.get('precio') as string;

  // Insertar en Base de Datos de backend
  console.log(\`Creando curso \${titulo} con precio \${precio} USD...\`);

  // Purgar la caché de Next.js para reflejar los datos actualizados
  revalidatePath('/cursos');
}
\`\`\``,
            resources: ['https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations']
          },
          {
            id: 2006,
            module: 202,
            order: 3,
            title: 'Lección 2.3: Estilizado Avanzado con TailwindCSS v4 y UI Neo-Brutalista',
            duration_seconds: 1020,
            content_text: `### 🎨 Manual Práctico: TailwindCSS v4 y Diseño Moderno

TailwindCSS v4 ofrece un motor de compilación ultra rápido basado en Rust (**Oxide Engine**), eliminación de archivos de configuración pesados y variables CSS nativas.`,
            resources: ['https://tailwindcss.com/docs']
          }
        ]
      },
      {
        id: 203,
        course: 2,
        order: 3,
        title: 'Módulo 3: Optimización, Autenticación y Despliegue en Producción',
        description: 'Optimización de assets, autenticación con Auth.js v5 y despliegue continuo en Vercel.',
        lessons: [
          {
            id: 2007,
            module: 203,
            order: 1,
            title: 'Lección 3.1: Optimización de Imágenes, Fuentes (next/font) y SEO Dinámico',
            duration_seconds: 1150,
            content_text: `### ⚡ Manual Teórico-Práctico: Optimización de Assets y SEO Dinámico

Aprende a lograr un puntaje de **100/100 en Google Lighthouse** utilizando las utilidades integradas de Next.js 15.`,
            resources: ['https://nextjs.org/docs/app/building-your-application/optimizing/images']
          },
          {
            id: 2008,
            module: 203,
            order: 2,
            title: 'Lección 3.2: Autenticación Segura y Rutas Protegidas (Auth.js v5)',
            duration_seconds: 1100,
            content_text: `### 🔒 Manual Práctico: Autenticación con Auth.js v5 y Middleware

Protección de rutas sensibles mediante \`middleware.ts\` y sesiones seguras basadas en JWT.`,
            resources: ['https://authjs.dev/']
          },
          {
            id: 2009,
            module: 203,
            order: 3,
            title: 'Lección 3.3: Proyecto Integrador: Plataforma Fullstack de Cursos con Next.js 15, Vercel & Tailwind',
            duration_seconds: 1600,
            content_text: `### 🚀 Proyecto Integrador: Despliegue Fullstack en Vercel

Construye y despliega la aplicación completa en Vercel con integración continua y variables de entorno seguras.

#### 🏆 ¡Felicidades!
Has completado con éxito el curso práctico de **React 19 & Next.js 15**.`,
            resources: ['https://vercel.com/docs']
          }
        ]
      }
    ]
  },

  // Course 3: Docker & Kubernetes / DevOps: Contenedores, CI/CD y Orquestación (COMPLETO 100%)
  docker: {
    cover_image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en infraestructura moderna y DevOps. Domina la contenerización con Docker, creación de Dockerfiles multi-stage livianos, orquestación local con Docker Compose, clústeres de producción con Kubernetes (Deployments, Services, Ingress), pipelines de CI/CD automatizados en GitHub Actions y despliegue continuo con GitOps.',
    modules: [
      {
        id: 301,
        course: 3,
        order: 1,
        title: 'Módulo 1: Fundamentos de Contenedores con Docker y Dockerfiles Optimizados',
        description: 'Arquitectura del motor de Docker, comandos CLI, creación de imágenes multi-etapa y orquestación con Docker Compose.',
        lessons: [
          {
            id: 3001,
            module: 301,
            order: 1,
            title: 'Lección 1.1: Introducción a la Contenerización, Arquitectura de Docker Engine y Comandos CLI',
            duration_seconds: 900,
            content_text: `### 🐳 Manual Teórico-Práctico: Fundamentos de Docker y Arquitectura de Contenedores

Bienvenido a la primera guía de estudio del curso de **Docker & Kubernetes / DevOps**. En esta lección aprenderás por qué la contenerización resolvió el clásico problema *"en mi máquina sí funciona"*, la arquitectura del cliente-servidor de Docker y los comandos fundamentales de consola.

---

#### 1. Diferencia entre Máquinas Virtuales (VMs) y Contenedores

- **Máquina Virtual (VM):** Empaqueta un Sistema Operativo completo sobre un hipervisor (VirtualBox, VMware). Consume gigabytes de RAM y tarda minutos en arrancar.
- **Contenedor (Docker):** Comparte el Kernel del Sistema Operativo del Host y aísla los procesos del usuario. Consume megabytes y arranca en milisegundos.

---

#### 2. Comandos CLI Esenciales de Docker

\`\`\`bash
# 1. Descargar y ejecutar un contenedor Nginx en segundo plano (puerto 8080 en host -> 80 en contenedor)
docker run -d -p 8080:80 --name mi-servidor-web nginx:alpine

# 2. Listar contenedores en ejecución
docker ps

# 3. Inspeccionar logs del contenedor en tiempo real
docker logs -f mi-servidor-web

# 4. Entrar a la consola interactiva del contenedor
docker exec -it mi-servidor-web /bin/sh

# 5. Detener y eliminar el contenedor
docker stop mi-servidor-web
docker rm mi-servidor-web
\`\`\`

---

#### 💡 Tabla de Comandos Principales de Docker

| Comando | Propósito | Ejemplo |
| --- | --- | --- |
| \`docker build\` | Construye una imagen desde un Dockerfile | \`docker build -t mi-app:v1 .\` |
| \`docker run\` | Crea y ejecuta un contenedor | \`docker run -d -p 3000:3000 mi-app:v1\` |
| \`docker exec\` | Ejecuta un comando en un contenedor activo | \`docker exec -it mi-app sh\` |
| \`docker system prune\` | Limpia espacio en disco (imágenes y contenedores muertos) | \`docker system prune -a --volumes\` |`,
            resources: ['https://docs.docker.com/get-started/overview/']
          },
          {
            id: 3002,
            module: 301,
            order: 2,
            title: 'Lección 1.2: Creación de Dockerfiles Multietapa (Multi-Stage Builds) de Alto Rendimiento',
            duration_seconds: 1050,
            content_text: `### 🛠️ Manual de Estudio: Dockerfiles Multi-Etapa de Producción

Aprende a construir imágenes Docker seguras y ultra ligeras reduciendo su tamaño de 1GB a menos de 30MB mediante la técnica de **Multi-Stage Builds**.

---

#### 1. Dockerfile Optimizado para Aplicaciones Web (Node.js / React)

\`\`\`dockerfile
# ----- ETAPA 1: Construcción (Builder) -----
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar manifiestos de dependencias primero para aprovechar la caché de Docker
COPY package*.json ./
RUN npm ci

# Copiar el código fuente y construir el bundle estático de producción
COPY . .
RUN npm run build

# ----- ETAPA 2: Servidor de Producción (Runner) -----
FROM nginx:alpine AS runner
WORKDIR /usr/share/nginx/html

# Copiar únicamente los archivos estáticos compilados de la Etapa 1
COPY --from=builder /app/dist .

# Exponer el puerto estándar
EXPOSE 80

# Comando de inicio del servidor web Nginx
CMD ["nginx", "-g", "daemon off;"]
\`\`\``,
            resources: ['https://docs.docker.com/build/building/multi-stage/']
          },
          {
            id: 3003,
            module: 301,
            order: 3,
            title: 'Lección 1.3: Redes en Docker y Orquestación Multicontenedor con Docker Compose',
            duration_seconds: 960,
            content_text: `### 🐙 Manual Práctico: Docker Compose y Entornos Multicontenedor

Definición y ejecución de múltiples servicios (Aplicación Web + Base de Datos PostgreSQL) mediante **\`docker-compose.yml\`**.

\`\`\`yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "5173:80"
    environment:
      - DATABASE_URL=postgres://postgres:secret@db:5432/oncourses_db
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: oncourses_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
\`\`\``,
            resources: ['https://docs.docker.com/compose/']
          }
        ]
      },
      {
        id: 302,
        course: 3,
        order: 2,
        title: 'Módulo 2: Orquestación de Producción con Kubernetes (K8s)',
        description: 'Arquitectura de clústeres K8s, despliegues (Deployments), servicios, ingress y almacenamiento persistente.',
        lessons: [
          {
            id: 3004,
            module: 302,
            order: 1,
            title: 'Lección 2.1: Arquitectura de Kubernetes: Control Plane, Worker Nodes, Pods y Deployments',
            duration_seconds: 1100,
            content_text: `### ☸️ Manual Avanzado: Manifiestos de Kubernetes (K8s)

Kubernetes es la plataforma estándar de la industria para orquestar contenedores a gran escala con autorrecuperación (*self-healing*) y escalado automático.

---

#### 1. Manifiesto YAML de Deployment en Kubernetes

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: oncourses-web-deployment
  labels:
    app: oncourses-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: oncourses-web
  template:
    metadata:
      labels:
        app: oncourses-web
    spec:
      containers:
      - name: web
        image: ghcr.io/alexlopezf04/oncourses-web:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "100m"
          limits:
            memory: "128Mi"
            cpu: "250m"
\`\`\``,
            resources: ['https://kubernetes.io/docs/concepts/workloads/controllers/deployment/']
          },
          {
            id: 3005,
            module: 302,
            order: 2,
            title: 'Lección 2.2: Servicios, Ingress Controllers y Gestión de Tráfico (Service, Ingress)',
            duration_seconds: 1250,
            content_text: `### 🌐 Manual de Estudio: Exposición de Servicios e Ingress Controllers en K8s

Aprende a exponer tus Pods mediante servicios de balanceo de carga y enrutamiento por dominio HTTP con **Ingress NGINX**.`,
            resources: ['https://kubernetes.io/docs/concepts/services-networking/service/']
          },
          {
            id: 3006,
            module: 302,
            order: 3,
            title: 'Lección 2.3: Configuración y Secretos (ConfigMaps & Secrets) con Almacenamiento Persistente (PVC)',
            duration_seconds: 1020,
            content_text: `### 🔒 Manual Práctico: ConfigMaps, Secrets y Volúmenes Persistentes en K8s

Gestión segura de variables de entorno y llaves secretas cifradas en base64 en Kubernetes.`,
            resources: ['https://kubernetes.io/docs/concepts/configuration/secret/']
          }
        ]
      },
      {
        id: 303,
        course: 3,
        order: 3,
        title: 'Módulo 3: Pipelines CI/CD Automatizados y Despliegue en la Nube',
        description: 'Pipelines CI/CD automatizados en GitHub Actions, pruebas, despliegue continuo con GitOps y monitoreo.',
        lessons: [
          {
            id: 3007,
            module: 303,
            order: 1,
            title: 'Lección 3.1: Integración Continua con GitHub Actions (CI Pipelines & Linting/Testing)',
            duration_seconds: 1150,
            content_text: `### 🚀 Manual Teórico-Práctico: Pipelines de CI/CD con GitHub Actions

Automatiza la construcción de imágenes Docker y la validación de linters en cada push a la rama \`main\`.

\`\`\`yaml
name: Docker CI/CD Pipeline

on:
  push:
    branches: [ "main" ]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Código Fuente
      uses: actions/checkout@v4

    - name: Iniciar Sesión en Docker Hub
      uses: docker/login-action@v3
      with:
        username: \${{ secrets.DOCKERHUB_USERNAME }}
        password: \${{ secrets.DOCKERHUB_TOKEN }}

    - name: Construir y Publicar Imagen Docker
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: alexlopez/oncourses-web:latest
\`\`\``,
            resources: ['https://docs.github.com/en/actions']
          },
          {
            id: 3008,
            module: 303,
            order: 2,
            title: 'Lección 3.2: Despliegue Continuo (CD) y GitOps con ArgoCD en Clusters Kubernetes',
            duration_seconds: 1100,
            content_text: `### 🔄 Manual Práctico: GitOps con ArgoCD y Sincronización Automática

Implementa la filosofía GitOps donde el estado deseado del clúster se mantiene 100% sincronizado con tu repositorio Git.`,
            resources: ['https://argo-cd.readthedocs.io/']
          },
          {
            id: 3009,
            module: 303,
            order: 3,
            title: 'Lección 3.3: Proyecto Integrador: Pipeline CI/CD Completo y Despliegue de App en Kubernetes',
            duration_seconds: 1600,
            content_text: `### 🚀 Proyecto Integrador: Despliegue DevOps Completo en la Nube

Construcción y ejecución de una arquitectura completa contenerizada y desplegada en Kubernetes.

#### 🏆 ¡Felicidades!
Has completado con éxito el curso práctico de **Docker & Kubernetes / DevOps**.`,
            resources: ['https://kubernetes.io/']
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
  },

  // Course: Desarrollo iOS con Swift y SwiftUI desde Cero (COMPLETO 100%)
  swift: {
    cover_image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en desarrollo móvil iOS con Swift 5.10 y SwiftUI. Domina la sintaxis moderna de Swift, arquitectura MVVM, gestión de estado declarativo (@State, @Binding, @StateObject), layouts reactivos, concurrencia Async/Await, consumo de APIs REST con URLSession y persistencia de datos.',
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
            content_text: `### 📱 Manual Teórico-Práctico: Sintaxis Swift, Optionals y Desempaquetado Seguro

Bienvenido a la primera guía de estudio del curso de **Desarrollo iOS con Swift y SwiftUI**. En este tema aprenderás la sintaxis limpia de Swift, la inmutabilidad con \`let\` y la característica de seguridad más importante del lenguaje: **los Optionals**.

---

#### 1. Variables, Constantes e Inmutabilidad en Swift

En Swift, la inmutabilidad es el valor por defecto para garantizar código libre de efectos secundarios.

- **\`let\`:** Define valores inmutables (constantes).
- **\`var\`:** Define variables mutables cuyo valor puede cambiar con el tiempo.

\`\`\`swift
// Declaración de constantes y variables con inferencia de tipo
let nombrePlataforma: String = "OnCourses iOS"
let precioCurso: Double = 9.99
var leccionesCompletadas: Int = 0

leccionesCompletadas += 1
print("Progreso actual: \\(leccionesCompletadas) lecciones en \\(nombrePlataforma)")
\`\`\`

---

#### 2. Manejo Seguro de Optionals (Desempaquetado)

Un **Optional** representa un valor que puede existir o ser \`nil\` (ausencia de valor). Evita los errores fatales tipo *NullPointerException* comunes en otros lenguajes.

- **Desempaquetado Seguro con \`if let\`:**
\`\`\`swift
var usuarioEmail: String? = "estudiante@oncourses.app"

if let emailValido = usuarioEmail {
    print("Email verificado: \\(emailValido)")
} else {
    print("El usuario no tiene un email registrado.")
}
\`\`\`

- **Guardia Temprana con \`guard let\`:**
\`\`\`swift
func procesarInscripcion(email: String?, cursoId: Int?) {
    guard let email = email, let cursoId = cursoId else {
        print("Error: Datos incompletos para procesar la inscripción.")
        return
    }
    print("Inscribiendo a \\(email) en el curso #\\(cursoId)...")
}
\`\`\`

- **Operador Nil Coalescing (\`??\`):**
\`\`\`swift
let avatarUrl: String? = nil
let avatarFinal = avatarUrl ?? "default_avatar.png"
print("Avatar seleccionado: \\(avatarFinal)")
\`\`\`

---

#### 💡 Resumen de Operadores de Desempaquetado

| Operador / Estructura | Seguridad | Descripción de Funcionamiento |
| --- | --- | --- |
| \`if let\` | 🟢 **100% Seguro** | Desempaqueta la variable opcional en un scope local controlado. |
| \`guard let\` | 🟢 **100% Seguro** | Exige la presencia del valor para continuar la ejecución de la función. |
| \`??\` (Nil Coalescing) | 🟢 **100% Seguro** | Proveer un valor por defecto en caso de que sea \`nil\`. |
| \`!\` (Force Unwrap) | 🔴 **Peligroso** | Fuerza el desempaquetado. Causa crash si el valor es \`nil\`. |

---

#### ✏️ Ejercicio Práctico Obligatorio
1. Crea una función en Swift llamada \`validarCurso(titulo: String?, precio: Double?)\`.
2. Utiliza \`guard let\` para asegurar que ambos valores existan y que el precio sea mayor o igual a cero.
3. Retorna un mensaje indicando *"Curso válido listo para publicar"* o *"Datos de curso inválidos"*.`,
            resources: ['https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/']
          },
          {
            id: 7002,
            module: 701,
            order: 2,
            title: 'Lección 1.2: Structs vs Classes, Mutating Methods y Value Semantics',
            duration_seconds: 1050,
            content_text: `### 🏛️ Manual de Estudio: Structs vs Classes y Semántica de Valores en Swift

Una de las decisiones arquitectónicas más importantes en desarrollo iOS es elegir cuándo usar **\`struct\`** y cuándo usar **\`class\`**. En SwiftUI, prácticamente todas las vistas son \`structs\`.

---

#### 1. Tipos por Valor (\`struct\`) vs Tipos por Referencia (\`class\`)

- **\`struct\` (Tipos por Valor):** Se copian cuando se pasan a una función o se asignan a otra variable. Viven en el Stack (Memoria rápida). No soportan herencia clásica.
- **\`class\` (Tipos por Referencia):** Se comparten mediante referencias apuntando a la misma instancia en memoria (Heap). Soportan herencia y de-inicializadores (\`deinit\`).

---

#### 2. Código de Ejemplo: Struct con Métodos Mutantes

\`\`\`swift
// Definición de una estructura inmutable por defecto
struct LeccionSwift {
    let id: Int
    let titulo: String
    var completada: Bool = false
    
    // Para modificar propiedades dentro de un struct se requiere 'mutating'
    mutating func marcarComoCompletada() {
        self.completada = true
        print("La lección '\\(titulo)' se ha marcado como completada.")
    }
}

// Ejemplo de semántica por valor (copia de datos)
var leccion1 = LeccionSwift(id: 101, titulo: "Sintaxis Swift")
var copiaLeccion = leccion1

copiaLeccion.marcarComoCompletada()

print("Estado Original: \\(leccion1.completada)")   // false (No se vio afectada)
print("Estado Copia: \\(copiaLeccion.completada)")   // true
\`\`\`

---

#### 3. Ejemplo de Clase (\`class\`) con Referencia Compartida

\`\`\`swift
class UsuarioEstudiante {
    var nombre: String
    var puntos: Int
    
    init(nombre: String, puntos: Int) {
        self.nombre = nombre
        self.puntos = puntos
    }
}

let estudianteA = UsuarioEstudiante(nombre: "Alex", puntos: 100)
let estudianteB = estudianteA  // Apuntan a la misma dirección de memoria

estudianteB.puntos += 50

print("Puntos de Estudiante A: \\(estudianteA.puntos)") // 150 (Comparten referencia)
\`\`\`

---

#### 📊 Comparativa de Arquitectura en Swift

| Característica | \`struct\` (Recomendado en SwiftUI) | \`class\` (Usado en ViewModels) |
| --- | --- | --- |
| Asignación | Copia por Valor (Value Semantics) | Referencia Compartida (Reference Semantics) |
| Almacenamiento | Memory Stack (Ultra rápido) | Memory Heap |
| Mutabilidad | Requiere palabra clave \`mutating\` | Mutable si la propiedad es \`var\` |
| Herencia | No soportada (Usa Protocolos) | Soporta Herencia jerárquica |`,
            resources: ['https://docs.swift.org/swift-book/documentation/the-swift-programming-language/structuresandclasses/']
          },
          {
            id: 7003,
            module: 701,
            order: 3,
            title: 'Lección 1.3: Programación Orientada a Protocolos (POP), Generics y Extensions',
            duration_seconds: 960,
            content_text: `### 🧩 Manual Práctico: Programación Orientada a Protocolos (POP) y Genéricos

Swift es un lenguaje orientado a protocolos (**Protocol-Oriented Programming**). En lugar de crear complejas jerarquías de herencia de clases, POP permite componer comportamientos mediante contratos reutilizables.

---

#### 1. Declaración de Protocolos y Extensiones

\`\`\`swift
// Contrato que define una entidad inscribible
protocol Inscribible {
    var id: Int { get }
    var titulo: String { get }
    func obtenerResumen() -> String
}

// Extensión para otorgar una implementación por defecto
extension Inscribible {
    func obtenerResumen() -> String {
        return "Curso #\\(id): \\(titulo)"
    }
}

// Estructura que adopta el protocolo
struct CursoiOS: Inscribible {
    let id: Int
    let titulo: String
    let requiereMac: Bool
}

let miCurso = CursoiOS(id: 7, titulo: "SwiftUI Pro", requiereMac: true)
print(miCurso.obtenerResumen())
\`\`\`

---

#### 2. Tipos Genéricos (\`Generics\`)
Permiten escribir funciones y tipos flexibles que funcionan con cualquier tipo de dato respetando la seguridad de tipos:

\`\`\`swift
struct RespuestaAPI<T: Codable>: Codable {
    let status: String
    let data: T
}
\`\`\``,
            resources: ['https://docs.swift.org/swift-book/documentation/the-swift-programming-language/protocols/']
          }
        ]
      },
      {
        id: 702,
        course: 7,
        order: 2,
        title: 'Módulo 2: Interfaces Modernas con SwiftUI, Arquitectura MVVM y Modificadores',
        description: 'Diseño UI declarativo en iOS, jerarquía de vistas en pila, wrappers de estado y arquitectura Model-View-ViewModel.',
        lessons: [
          {
            id: 7004,
            module: 702,
            order: 1,
            title: 'Lección 2.1: Estructura de una Vista SwiftUI, Layout Stack (VStack, HStack, ZStack) y Componentes',
            duration_seconds: 1100,
            content_text: `### 🎨 Manual Avanzado: Interfaces Declarativas con SwiftUI y Layout Stacks

SwiftUI revolucionó el desarrollo móvil en iOS al permitir crear interfaces de usuario de manera declarativa: describes **qué** debe mostrar la pantalla en lugar de cómo dibujarla imperativamente.

---

#### 1. Las Tres Pilas de Diseño (Stacks) en SwiftUI

- **\`VStack\` (Vertical Stack):** Alinea elementos verticalmente de arriba hacia abajo.
- **\`HStack\` (Horizontal Stack):** Alinea elementos horizontalmente de izquierda a derecha.
- **\`ZStack\` (Depth Stack):** Superpone elementos uno encima del otro en el eje Z (útil para fondos y capas).

---

#### 2. Código de Ejemplo: Tarjeta de Curso en SwiftUI

\`\`\`swift
import SwiftUI

struct TarjetaCursoView: View {
    let titulo: String
    let profesor: String
    let precio: String
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            // Cabecera con Badge de Categoría
            HStack {
                Text("iOS & SWIFT")
                    .font(.caption)
                    .fontWeight(.bold)
                    .padding(.horizontal, 8)
                    .padding(.vertical, 4)
                    .background(Color.green)
                    .foregroundColor(.black)
                    .cornerRadius(4)
                
                Spacer()
                
                Image(systemName: "bookmark.fill")
                    .foregroundColor(.green)
            }
            
            Text(titulo)
                .font(.headline)
                .fontWeight(.black)
                .foregroundColor(.primary)
                .lineLimit(2)
            
            Text("Profesor: \\(profesor)")
                .font(.subheadline)
                .foregroundColor(.secondary)
            
            Divider()
            
            HStack {
                Text(precio)
                    .font(.title3)
                    .fontWeight(.bold)
                    .foregroundColor(.green)
                
                Spacer()
                
                Button(action: {
                    print("Inscribiendo curso...")
                }) {
                    Text("Ver Detalle")
                        .font(.caption)
                        .fontWeight(.bold)
                        .padding(.horizontal, 12)
                        .padding(.vertical, 8)
                        .background(Color.black)
                        .foregroundColor(.white)
                        .cornerRadius(6)
                }
            }
        }
        .padding(16)
        .background(Color(UIColor.systemBackground))
        .cornerRadius(12)
        .shadow(color: Color.black.opacity(0.1), radius: 6, x: 0, y: 3)
    }
}
\`\`\`

---

#### 📊 Comparativa de Pilas de Diseño

| Componente | Dirección de Alineación | Caso de Uso Común |
| --- | --- | --- |
| **\`VStack\`** | Vertical (Y) | Formularios, listas de contenido y textos estructurados. |
| **\`HStack\`** | Horizontal (X) | Filas de botones, precios al lado de acciones y avatars con nombre. |
| **\`ZStack\`** | Profundidad (Z) | Imágenes de fondo con texto superpuesto, indicadores de carga. |`,
            resources: ['https://developer.apple.com/documentation/swiftui/']
          },
          {
            id: 7005,
            module: 702,
            order: 2,
            title: 'Lección 2.2: Gestión de Estado Declarativo en SwiftUI (@State, @Binding, @StateObject, @ObservedObject)',
            duration_seconds: 1250,
            content_text: `### ⚡ Manual de Estudio: Property Wrappers de Estado en SwiftUI y MVVM

En SwiftUI, la interfaz de usuario es una función directa del estado: **UI = f(State)**. Cuando el estado cambia, SwiftUI invalida automáticamente la vista y re-dibuja solo los componentes afectados.

---

#### 1. Matriz de Property Wrappers de Estado

- **\`@State\`:** Gestiona el estado privado e interno dentro de una sola vista \`struct\`.
- **\`@Binding\`:** Crea una conexión de lectura/escritura bidireccional entre una vista padre y una vista hija.
- **\`@StateObject\`:** Instancia y gestiona el ciclo de vida de un ViewModel (\`ObservableObject\`).
- **\`@ObservedObject\`:** Recibe un ViewModel pasado desde una vista externa.

---

#### 2. Ejemplo Práctico: Contador de Lecciones con @State y @Binding

\`\`\`swift
import SwiftUI

// Vista Hija con @Binding
struct BotonCompletarView: View {
    @Binding var completado: Bool
    
    var body: some View {
        Button(action: {
            completado.toggle()
        }) {
            HStack {
                Image(systemName: completado ? "checkmark.circle.fill" : "circle")
                Text(completado ? "Lección Completada" : "Marcar como Completada")
            }
            .fontWeight(.bold)
            .padding()
            .background(completado ? Color.green : Color.blue)
            .foregroundColor(.white)
            .cornerRadius(8)
        }
    }
}

// Vista Padre con @State
struct LeccionDetalleView: View {
    @State private var esCompletada: Bool = false
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Lección 2.2: Estado en SwiftUI")
                .font(.title2)
                .fontWeight(.bold)
            
            // Pasar la referencia de binding con el prefijo '$'
            BotonCompletarView(completado: $esCompletada)
        }
        .padding()
    }
}
\`\`\``,
            resources: ['https://developer.apple.com/documentation/swiftui/state-and-data-flow']
          },
          {
            id: 7006,
            module: 702,
            order: 3,
            title: 'Lección 2.3: Navegación Estructurada y Listas Dinámicas (NavigationStack, List, Form)',
            duration_seconds: 1020,
            content_text: `### 🧭 Manual Práctico: NavigationStack y Listas Dinámicas en iOS 16+

Aprende a estructurar flujos de navegación fluidos entre pantallas en iOS utilizando la API moderna **\`NavigationStack\`** y despliegue de colecciones de datos con **\`List\`**.

---

#### 1. Navegación con NavigationStack y NavigationLink

\`\`\`swift
import SwiftUI

struct CatalogoCursosView: View {
    let cursos = [
        CursoiOS(id: 1, titulo: "Swift 5 desde Cero", requiereMac: false),
        CursoiOS(id: 2, titulo: "SwiftUI & MVVM Avanzado", requiereMac: true),
        CursoiOS(id: 3, titulo: "iOS Apps con APIs REST", requiereMac: true)
    ]
    
    var body: some View {
        NavigationStack {
            List(cursos, id: \\.id) { curso in
                NavigationLink(destination: Text("Detalle de \\(curso.titulo)")) {
                    HStack {
                        Image(systemName: "play.tv.fill")
                            .foregroundColor(.green)
                        Text(curso.titulo)
                            .fontWeight(.semibold)
                    }
                }
            }
            .navigationTitle("Cursos de iOS")
        }
    }
}
\`\`\``,
            resources: ['https://developer.apple.com/documentation/swiftui/navigationstack']
          }
        ]
      },
      {
        id: 703,
        course: 7,
        order: 3,
        title: 'Módulo 3: Asincronía con Async/Await, Consumo de APIs REST y Persistencia Local',
        description: 'Concurrencia moderna con Async/Await, peticiones de red con URLSession, decodificación JSON con Codable y proyecto final integrador.',
        lessons: [
          {
            id: 7007,
            module: 703,
            order: 1,
            title: 'Lección 3.1: Concurrencia Moderna en Swift: Async/Await y Task',
            duration_seconds: 1150,
            content_text: `### ⏳ Manual Teórico-Práctico: Concurrencia Moderna con Async/Await

La concurrencia en Swift 5.5+ reemplazó las complejas closures de callback (*Callback Hell*) por una sintaxis síncrona limpia basada en las palabras clave **\`async\`** y **\`await\`**.

---

#### 1. Función Asíncrona con Manejo de Errores

\`\`\`swift
import Foundation

// Definición de errores del servicio de red
enum NetworkError: Error {
    case urlInvalida
    case errorServidor
    case datosCorruptos
}

// Estructura de modelo decodificable
struct CursoResponse: Codable, Identifiable {
    let id: Int
    let title: String
    let price: String
}

// Servicio de Red usando Async/Await
class CoursesAPIService {
    func obtenerCursosDesdeServidor() async throws -> [CursoResponse] {
        guard let url = URL(string: "http://localhost:8000/api/courses/") else {
            throw NetworkError.urlInvalida
        }
        
        // Petición asíncrona no bloqueante
        let (data, response) = try await URLSession.shared.data(from: url)
        
        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            throw NetworkError.errorServidor
        }
        
        // Decodificación JSON
        let decoder = JSONDecoder()
        return try decoder.decode([CursoResponse].self, from: data)
    }
}
\`\`\`

---

#### 💡 Ventajas de Async/Await frente a Completion Handlers

| Característica | Closures Antiguas (Callbacks) | Modern Async / Await |
| --- | --- | --- |
| Legibilidad | Compleja (Bloques anidados) | **Secuencial y limpia** |
| Control de Errores | Fácil olvidar invocar el handler | **Manejo estricto con \`try / catch\`** |
| Hilos de Ejecución | Requiere dispatch manual a Main Thread | **\`@MainActor\` garantiza updates en UI Thread** |`,
            resources: ['https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/']
          },
          {
            id: 7008,
            module: 703,
            order: 2,
            title: 'Lección 3.2: Consumo de APIs REST con URLSession y Decodificación JSON (Codable)',
            duration_seconds: 1100,
            content_text: `### 🌐 Manual Práctico: ViewModel con @MainActor y URLSession en SwiftUI

Integra el servicio de red asíncrono dentro de un ViewModel en arquitectura MVVM para actualizar la interfaz de SwiftUI automáticamente.

---

#### 1. Implementación del ViewModel con @MainActor

\`\`\`swift
import Foundation
import SwiftUI

@MainActor
class CursosViewModel: ObservableObject {
    @Published var cursos: [CursoResponse] = []
    @Published var estaCargando: Bool = false
    @Published var mensajeError: String? = nil
    
    private let apiService = CoursesAPIService()
    
    func cargarCursos() async {
        estaCargando = true
        mensajeError = nil
        
        do {
            self.cursos = try await apiService.obtenerCursosDesdeServidor()
        } catch {
            self.mensajeError = "No se pudieron obtener los cursos: \\(error.localizedDescription)"
        }
        
        estaCargando = false
    }
}
\`\`\``,
            resources: ['https://developer.apple.com/documentation/foundation/urlsession']
          },
          {
            id: 7009,
            module: 703,
            order: 3,
            title: 'Lección 3.3: Proyecto Integrador: App de Catálogo de Cursos en iOS (SwiftUI + MVVM)',
            duration_seconds: 1600,
            content_text: `### 🚀 Proyecto Integrador: App Completa de Cursos en iOS con SwiftUI

En esta lección final conectarás todos los módulos aprendidos para construir una aplicación nativa completa para iOS con interfaz moderna en SwiftUI, arquitectura MVVM y consumo de datos REST.

---

#### 📱 Código Fuente Completo de la Vista Principal

\`\`\`swift
import SwiftUI

struct AppOnCoursesMainView: View {
    @StateObject private var viewModel = CursosViewModel()
    
    var body: some View {
        NavigationStack {
            Group {
                if viewModel.estaCargando {
                    ProgressView("Cargando catálogo de cursos...")
                        .scaleEffect(1.2)
                } else if let error = viewModel.mensajeError {
                    VStack(spacing: 12) {
                        Image(systemName: "exclamationmark.triangle.fill")
                            .font(.system(size: 40))
                            .foregroundColor(.orange)
                        Text(error)
                            .font(.subheadline)
                            .multilineTextAlignment(.center)
                        Button("Reintentar") {
                            Task {
                                await viewModel.cargarCursos()
                            }
                        }
                        .buttonStyle(.borderedProminent)
                    }
                    .padding()
                } else {
                    List(viewModel.cursos) { curso in
                        VStack(alignment: .leading, spacing: 6) {
                            Text(curso.title)
                                .font(.headline)
                                .fontWeight(.black)
                            
                            HStack {
                                Text("Inversión: $\\(curso.price) USD")
                                    .font(.subheadline)
                                    .foregroundColor(.green)
                                    .fontWeight(.bold)
                                Spacer()
                                Text("Inscrito")
                                    .font(.caption2)
                                    .padding(.horizontal, 6)
                                    .padding(.vertical, 2)
                                    .background(Color.green.opacity(0.2))
                                    .foregroundColor(.green)
                            }
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .navigationTitle("OnCourses iOS ")
            .task {
                await viewModel.cargarCursos()
            }
        }
    }
}
\`\`\`

---

#### 🏆 ¡Felicidades!
Has completado con éxito el curso práctico de **Desarrollo iOS con Swift y SwiftUI desde Cero**. ¡Estás listo para construir tus propias aplicaciones nativas en el ecosistema Apple!`,
            resources: ['https://developer.apple.com/tutorials/swiftui']
          }
        ]
      }
    ]
  },

  // Course: Flutter 3.24 & Dart desde Cero: Desarrollo Móvil Multiplataforma (COMPLETO 100%)
  flutter: {
    cover_image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop',
    description: 'Manual de estudio profesional en desarrollo móvil multiplataforma para iOS y Android con Flutter 3.24 y Dart 3.5. Domina la sintaxis de Dart con Sound Null Safety, arquitectura de Widgets declarativos (Stateless y Stateful), gestión de estado con Provider/Riverpod, consumo de APIs REST con Dio y persistencia local.',
    modules: [
      {
        id: 801,
        course: 8,
        order: 1,
        title: 'Módulo 1: Fundamentos del Lenguaje Dart 3.5+ y Programación Reactiva',
        description: 'Sintaxis de Dart, Sound Null Safety, clases, mixins, modificadores de clase y programación asíncrona con Futures y Streams.',
        lessons: [
          {
            id: 8001,
            module: 801,
            order: 1,
            title: 'Lección 1.1: Sintaxis Moderna de Dart, Null Safety y Tipos Primarios',
            duration_seconds: 900,
            content_text: `### 🎯 Manual Teórico-Práctico: Sintaxis de Dart 3.5 y Sound Null Safety

Bienvenido a la primera guía de estudio del curso de **Flutter 3.24 & Dart desde Cero**. En esta lección aprenderás los fundamentos del lenguaje **Dart**, el motor que impulsa a Flutter para compilar a código nativo de ARM64 en iOS y Android.

---

#### 1. Inmutabilidad y Declaración de Variables en Dart

- **\`final\`:** Variable cuyo valor se asigna una sola vez durante la ejecución.
- **\`const\`:** Constante en tiempo de compilación. Las vistas de Flutter declaradas como \`const\` reducen el trabajo del motor gráfico Skia/Impeller.
- **\`var\`:** Inferencia dinámica de tipo en tiempo de compilación.

\`\`\`dart
void main() {
  const String appName = 'OnCourses Mobile';
  final DateTime fechaInicio = DateTime.now();
  var totalEstudiantes = 1500;
  
  print('Bienvenido a $appName. Inicio: $fechaInicio. Estudiantes: $totalEstudiantes');
}
\`\`\`

---

#### 2. Sound Null Safety en Dart

Dart garantiza que las variables no puedan contener el valor \`null\` a menos que las declares explícitamente como opcionales con el símbolo **\`?\`**.

\`\`\`dart
// Variable no-nula (Garantizada por Dart)
String correoObligatorio = 'alex@oncourses.app';

// Variable opcional
String? telefonoOpcional = null;

// Operador Nil Coalescing '??'
String telefonoFinal = telefonoOpcional ?? 'Sin teléfono registrado';

// Acceso seguro con '?.'
int? longitud = telefonoOpcional?.length;
\`\`\`

---

#### 💡 Tabla de Operadores Null Safety en Dart

| Operador | Nombre | Descripción de Funcionamiento |
| --- | --- | --- |
| **\`?\`** | Nullable Type | Indica que una variable puede contener \`null\`. |
| **\`!\`** | Null Assertion | Fuerza a Dart a tratar un valor opcional como no-nulo (Usar con precaución). |
| **\`??\`** | If-Null Operator | Retorna el valor de la izquierda si no es nulo, de lo contrario evalúa la derecha. |
| **\`??=\`** | Assignment Operator | Asigna el valor solo si la variable actual es \`null\`. |`,
            resources: ['https://dart.dev/language/null-safety']
          },
          {
            id: 8002,
            module: 801,
            order: 2,
            title: 'Lección 1.2: Programación Orientada a Objetos en Dart, Mixins y Modificadores (sealed, final, base)',
            duration_seconds: 1050,
            content_text: `### 🏛️ Manual de Estudio: POO Avanzada en Dart 3 y Mixins

Dart 3 introdujo nuevos modificadores de clase para mejorar la seguridad del diseño de librerías y la arquitectura de datos.

---

#### 1. Constructores Nombrados y Reutilización con Mixins

\`\`\`dart
// Definición de un Mixin para añadir capacidad de loggeo
mixin LoggerMixin {
  void log(String mensaje) {
    print('[LOG \\\${DateTime.now()}]: $mensaje');
  }
}

// Clase base con constructor nombrado
class CursoModel with LoggerMixin {
  final int id;
  final String titulo;
  final double precio;

  // Constructor const de alto rendimiento
  const CursoModel({
    required this.id,
    required this.titulo,
    required this.precio,
  });

  // Constructor nombrado para crear instancias gratuitas
  CursoModel.gratuito({required this.id, required this.titulo}) : precio = 0.0;

  void mostrarDetalle() {
    log('Curso #$id: $titulo - USD $$precio');
  }
}
\`\`\``,
            resources: ['https://dart.dev/language/mixins']
          },
          {
            id: 8003,
            module: 801,
            order: 3,
            title: 'Lección 1.3: Asincronía en Dart: Futures, Streams y Async/Await',
            duration_seconds: 960,
            content_text: `### ⚡ Manual Práctico: Futures y Streams Reactivos en Dart

Aprende a procesar operaciones asíncronas de red mediante **\`Future<T>\`** y flujos continuos de datos reactivos con **\`Stream<T>\`**.`,
            resources: ['https://dart.dev/codelabs/async-await']
          }
        ]
      },
      {
        id: 802,
        course: 8,
        order: 2,
        title: 'Módulo 2: Arquitectura Flutter 3.24, Widgets y Gestión de Estado',
        description: 'Construcción de árbol de widgets UI, layouts responsivos y arquitectura de estado con Provider.',
        lessons: [
          {
            id: 8004,
            module: 802,
            order: 1,
            title: 'Lección 2.1: El Árbol de Widgets de Flutter (StatelessWidget vs StatefulWidget)',
            duration_seconds: 1100,
            content_text: `### 💙 Manual Avanzado: Componentes UI con StatelessWidget y StatefulWidget

En Flutter, absolutamente todo es un **Widget**. El motor gráfico redibuja las vistas con 60 a 120 fotogramas por segundo (FPS).

---

#### 1. Ejemplo de StatefulWidget con Contador

\`\`\`dart
import 'package:flutter/material.dart';

class ContadorLeccionesWidget extends StatefulWidget {
  final String tituloCurso;

  const ContadorLeccionesWidget({Key? key, required this.tituloCurso}) : super(key: key);

  @override
  State<ContadorLeccionesWidget> createState() => _ContadorLeccionesWidgetState();
}

class _ContadorLeccionesWidgetState extends State<ContadorLeccionesWidget> {
  int _contadorLecciones = 0;

  void _incrementarLeccion() {
    setState(() {
      _contadorLecciones++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.all(16),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(widget.tituloCurso, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            Text('Lecciones Vistas: $_contadorLecciones', style: const TextStyle(fontSize: 16, color: Colors.green)),
            const SizedBox(height: 16),
            ElevatedButton.icon(
              onPressed: _incrementarLeccion,
              icon: const Icon(Icons.check_circle),
              label: const Text('Completar Lección'),
            )
          ],
        ),
      ),
    );
  }
}
\`\`\``,
            resources: ['https://docs.flutter.dev/ui/widgets-intro']
          },
          {
            id: 8005,
            module: 802,
            order: 2,
            title: 'Lección 2.2: Layouts Avanzados en Flutter (Column, Row, Container, ListView, GridView)',
            duration_seconds: 1250,
            content_text: `### 🎨 Manual de Estudio: Layouts Adaptables y Listas Dinámicas en Flutter

Aprende a estructurar pantallas móviles optimizadas para teléfonos y tablets utilizando pilas de layout y vistas desplegables eficientes.`,
            resources: ['https://docs.flutter.dev/ui/layout']
          },
          {
            id: 8006,
            module: 802,
            order: 3,
            title: 'Lección 2.3: Gestión de Estado Avanzada con Provider y ChangeNotifier',
            duration_seconds: 1020,
            content_text: `### ⚡ Manual Práctico: Gestión de Estado Global con Provider en Flutter

Separa la lógica de negocio de la capa de interfaz de usuario mediante el patrón **Provider / ChangeNotifier**.`,
            resources: ['https://pub.dev/packages/provider']
          }
        ]
      },
      {
        id: 803,
        course: 8,
        order: 3,
        title: 'Módulo 3: Peticiones HTTP, Persistencia Local y Despliegue en App Store & Play Store',
        description: 'Consumo de APIs REST con Dio/Http, almacenamiento local con SharedPreferences y publicación de apps.',
        lessons: [
          {
            id: 8007,
            module: 803,
            order: 1,
            title: 'Lección 3.1: Consumo de APIs REST con Dio / HTTP y Serialización JSON',
            duration_seconds: 1150,
            content_text: `### 🌐 Manual Teórico-Práctico: Peticiones de Red HTTP en Flutter

Conexión asíncrona con servicios web REST utilizando el paquete \`http\` o \`dio\`.`,
            resources: ['https://pub.dev/packages/http']
          },
          {
            id: 8008,
            module: 803,
            order: 2,
            title: 'Lección 3.2: Persistencia de Datos Local (SharedPreferences & SQLite)',
            duration_seconds: 1100,
            content_text: `### 💾 Manual Práctico: Almacenamiento Local de Preferencias y Caché

Almacenamiento de tokens de autenticación y estados fuera de línea mediante **\`SharedPreferences\`**.`,
            resources: ['https://pub.dev/packages/shared_preferences']
          },
          {
            id: 8009,
            module: 803,
            order: 3,
            title: 'Lección 3.3: Proyecto Integrador: App Móvil Completa de E-Learning Multiplataforma',
            duration_seconds: 1600,
            content_text: `### 🚀 Proyecto Integrador: Aplicación Flutter Multiplataforma

Construcción y generación de paquetes APK/AAB para Android y Bundle para iOS.

#### 🏆 ¡Felicidades!
Has completado con éxito el curso práctico de **Flutter 3.24 & Dart desde Cero**.`,
            resources: ['https://docs.flutter.dev/deployment/android']
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

/**
 * Utility function to enrich any course from backend or fallback
 */
export function enrichCourseData(course: Course): Course {
  const titleLower = course.title.toLowerCase();
  const slugLower = (course.slug || '').toLowerCase();

  let seedKey = 'python';
  if (titleLower.includes('docker') || titleLower.includes('devops') || titleLower.includes('kubernetes') || slugLower.includes('docker') || slugLower.includes('devops') || course.id === 3) {
    seedKey = 'docker';
  } else if (titleLower.includes('flutter') || titleLower.includes('dart') || slugLower.includes('flutter') || slugLower.includes('dart') || course.id === 8) {
    seedKey = 'flutter';
  } else if (titleLower.includes('react') || titleLower.includes('next') || slugLower.includes('react') || slugLower.includes('next') || course.id === 2) {
    seedKey = 'react';
  } else if (titleLower.includes('swift') || titleLower.includes('ios') || titleLower.includes('apple') || slugLower.includes('swift') || slugLower.includes('ios') || course.id === 7) {
    seedKey = 'swift';
  } else if (titleLower.includes('script') || titleLower.includes('js') || slugLower.includes('js')) {
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

  const seed = COURSE_SEED_DETAILS[seedKey] || COURSE_SEED_DETAILS.docker;

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
    2: 'React 19 & Next.js 15: Guía Práctica Fullstack',
    3: 'Docker & Kubernetes / DevOps: Contenedores y CI/CD',
    4: 'Git & GitHub: Control de Versiones en Equipo',
    5: 'PostgreSQL: Optimización de Consultas y Modelado',
    6: 'Fundamento de Bases de Datos - SQL',
    7: 'Desarrollo iOS con Swift y SwiftUI desde Cero',
    8: 'Flutter 3.24 & Dart desde Cero: Desarrollo Móvil Multiplataforma',
  };

  const title = titles[id] || (id === 3 ? 'Docker & Kubernetes / DevOps: Contenedores y CI/CD' : `Curso #${id}: Desarrollo Web & Infraestructura`);
  const seedKey = id === 1 ? 'python' : (id === 2 ? 'react' : (id === 3 ? 'docker' : (id === 7 ? 'swift' : (id === 8 ? 'flutter' : 'postgresql'))));
  const seed = COURSE_SEED_DETAILS[seedKey] || COURSE_SEED_DETAILS.docker;

  return {
    id: id,
    title: title,
    slug: `curso-${id}`,
    price: id % 2 === 0 ? '19.99' : '9.99',
    cover_image: seed.cover_image,
    category: 1,
    category_name: 'DevOps & Infraestructura',
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

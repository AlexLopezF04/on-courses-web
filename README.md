# On-Courses Frontend 🎓

Frontend premium, responsivo y de alto rendimiento desarrollado en **React**, **Vite** y **TypeScript**, estilizado con **TailwindCSS v4** y estructurado bajo los principios de **Arquitectura Limpia**.

Este proyecto se conecta a la API REST de Django en producción: `https://on-courses-api.uaeftt-ute.site/api/`

---

## 🛠️ Arquitectura del Proyecto

El proyecto sigue una estructura desacoplada que separa la lógica del negocio de los detalles de infraestructura y presentación:

```text
src/
├── domain/                         # Capa de Dominio: Reglas puras y tipos (Agnóstico a frameworks)
│   ├── entities/                   # Modelos de datos (User, Course, Lesson, Enrollment)
│   ├── enums/                      # Definiciones de constantes/roles (UserRole)
│   └── ports/                      # Interfaces y abstracciones de comunicación (IAuthRepository)
│
├── application/                    # Capa de Aplicación: Casos de uso
│   ├── use-cases/                  # Lógica orquestadora (LoginUseCase, GetCoursesUseCase)
│   └── dtos/                       # Estructuras de datos de entrada/salida (AuthDto)
│
├── infrastructure/                 # Capa de Infraestructura: Adaptadores y librerías externas
│   ├── config/                     # Configuración de variables de entorno y constantes de red
│   ├── http/                       # Cliente centralizado (AxiosClient) y formateo de errores
│   ├── storage/                    # Persistencia del token JWT (LocalTokenStorage)
│   ├── adapters/                   # Repositorios concretos (AxiosAuthRepository, AxiosCourseRepository)
│   └── factories/                  # Instanciadores e inyectores de dependencia (AuthFactory)
│
└── presentation/                   # Capa de Presentación: UI y estados reactivos
    ├── store/                      # Estados globales (Zustand: useAuthStore, useThemeStore)
    ├── router/                     # Enrutador con guardias de autenticación y de roles
    ├── components/                 # Componentes globales y modulares (Navbar, Footer, Button)
    └── pages/                      # Vistas y pantallas (HomePage, StudentDashboard, CatalogPage, etc.)
```

---

## 🚀 Tecnologías Principales

*   **Core:** React 19, TypeScript 6, Vite 8.
*   **Estilos:** TailwindCSS v4 con soporte nativo de Light/Dark Mode mediante la variante `dark:`.
*   **Gestión de Estado:** Zustand (para el flujo reactivo de sesión y persistencia del tema).
*   **Cliente HTTP:** Axios con interceptores automáticos para inyectar el token JWT y reintentar peticiones fallidas mediante refresco de token.

---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto basándote en `.env.example`:

```env
VITE_API_URL=https://on-courses-api.uaeftt-ute.site/api
```

---

## 💻 Instalación y Ejecución Local

Sigue estos pasos para arrancar el servidor de desarrollo local:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/AlexLopezF04/on-courses-web.git
    cd on-courses-web
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
4.  **Compila para producción (bundle optimizado):**
    ```bash
    npm run build
    ```
5.  **Revisa la calidad del código:**
    ```bash
    npm run lint
    ```

---

## 🤖 Pipeline CI/CD (GitHub Actions)

El proyecto incluye un flujo automático de Integración Continua (CI) y Despliegue Continuo (CD) configurado en [.github/workflows/deploy.yml](file:///.github/workflows/deploy.yml).

### Flujo de la Pipeline:
1.  **Activación:** Se ejecuta automáticamente ante cada push a la rama `main`.
2.  **Linting & Testing:** Descarga las dependencias e inicia el compilador de TypeScript (`tsc`) y el formateador de calidad (`oxlint`/`eslint`) para validar el código.
3.  **Build:** Compila el frontend generando los archivos estáticos listos en el directorio `dist/`.
4.  **Despliegue a VPS:** Transfiere de forma segura la compilación mediante protocolo SSH/SCP hacia el directorio web de producción del VPS (ej: `/var/www/on-courses-frontend`).
5.  **Recarga de Nginx:** Reinicia de forma remota y sin interrupciones el servidor Nginx en el VPS para servir la nueva versión con el certificado SSL (Let's Encrypt).

---

## 🔑 Credenciales de Prueba (Entorno de Producción)

Para facilitar la evaluación docente, se encuentran creadas y configuradas en el backend las siguientes cuentas con diferentes privilegios y roles:

1.  **Administrador (Admin):**
    *   **Usuario:** `admin_test`
    *   **Contraseña:** `admin_Pass123` (o `adminPass123`)
    *   *Permisos:* Gestión completa (CRUD) de Cursos, Categorías y Temarios.

2.  **Profesor (Professor):**
    *   **Usuario:** `prof_test`
    *   **Contraseña:** `profPass123` (o la contraseña definida en tu base de datos)
    *   *Permisos:* Creación y edición de Cursos, Categorías y Temarios. Botones de eliminación bloqueados en la UI.

3.  **Estudiante (Student):**
    *   **Usuario:** `student_test`
    *   **Contraseña:** `studentPass123` (o la contraseña definida en tu base de datos)
    *   *Permisos:* Acceso público a catálogo y compra/inscripción de cursos, visualización de clases y marcado de progreso.

---

## 🔗 Enlaces del Proyecto en Producción

*   **Aplicación Frontend:** [https://on-courses.uaeftt-ute.site](https://on-courses.uaeftt-ute.site)
*   **Servicio REST API (Backend):** [https://on-courses-api.uaeftt-ute.site/api/](https://on-courses-api.uaeftt-ute.site/api/)

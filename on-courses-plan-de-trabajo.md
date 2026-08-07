# OnCourses — Diagnóstico y Plan de Trabajo

> Preparado a partir de una revisión estática de los 3 repos (backend Django, web React/Vite, app Flutter). Úsalo como brief para Claude Code.

---

## 1. Bug de video en la Web — causa raíz confirmada

**Síntoma reportado:** ningún video carga.

**Causa raíz:** `CourseDetailPage.tsx` (el reproductor real que ve el estudiante, sección "TEMARIO INTERACTIVO") inserta `currentLesson.video_url` sin procesar dentro de un `<iframe>`:

```tsx
// CourseDetailPage.tsx — ACTUAL (roto)
<iframe
  src={sanitizeUrl(currentLesson.video_url)}
  title={currentLesson.title}
  className="w-full h-full border-0"
  allowFullScreen
/>
```

Si `video_url` está en formato `https://www.youtube.com/watch?v=XXXX` (el formato que el propio formulario `LessonModal` sugiere como placeholder), YouTube responde con `X-Frame-Options`/CSP y el iframe se queda en blanco. Como todas las lecciones probablemente se cargaron con ese formato, **todas fallan**.

**Problema secundario (ya existe una utilidad que resuelve esto, pero no se usa en todos lados):** `src/presentation/utils/sanitize-url.ts` tiene `getEmbedVideoUrl()`, que sí normaliza YouTube/Vimeo/mp4 — pero:
- `CourseDetailPage.tsx` no la usa (usa `sanitizeUrl` a secas).
- `LessonsList.tsx` tiene su propia lógica distinta (`.includes('youtube') || .includes('embed')`).
- `getEmbedVideoUrl()` en su rama final (URL vacía o no reconocida) devuelve un video local hardcodeado (`/videos/sql_lesson_1.mp4`) en vez de un estado vacío — esto es un bug latente que hay que corregir también, aunque no sea la causa del síntoma actual.

### Fix recomendado (3 pasos)

**Paso 1 — Corregir el fallback de `getEmbedVideoUrl` en `sanitize-url.ts`:**
```ts
// Reemplazar el fallback final: NO devolver un video hardcodeado
export function getEmbedVideoUrl(url?: string): { isEmbed: boolean; isDirectVideo: boolean; embedUrl: string } {
  if (!url || !url.trim()) {
    return { isEmbed: false, isDirectVideo: false, embedUrl: '' };
  }
  // ...mismas validaciones de youtube/vimeo/mp4 que ya existen...

  // fallback final: si no coincide con ningún patrón conocido, no inventar nada
  return { isEmbed: false, isDirectVideo: false, embedUrl: '' };
}
```
Y en cada componente, si `embedUrl === ''`, mostrar el estado "video no disponible" que ya existe en `LessonsList.tsx` (el bloque con el ícono `Play` y el mensaje "Video de la lección disponible") en vez de reproducir cualquier cosa.

**Paso 2 — Usar `getEmbedVideoUrl()` en `CourseDetailPage.tsx`** (el que realmente importa arreglar):
```tsx
import { getEmbedVideoUrl } from '../utils/sanitize-url';

// dentro del render:
{currentLesson.video_url && (() => {
  const { isEmbed, isDirectVideo, embedUrl } = getEmbedVideoUrl(currentLesson.video_url);
  if (!embedUrl) return null; // o el estado vacío
  return (
    <div className="aspect-video">
      {isDirectVideo ? (
        <video src={embedUrl} controls className="w-full h-full" />
      ) : (
        <iframe src={embedUrl} title={currentLesson.title} className="w-full h-full border-0" allowFullScreen />
      )}
    </div>
  );
})()}
```

**Paso 3 — Reemplazar la lógica ad-hoc de `LessonsList.tsx`** por la misma llamada a `getEmbedVideoUrl()`, para que las 3 pantallas (detalle de curso, lista de lecciones, preview del admin) se comporten igual.

**Extra:** en `LessonModal.tsx`, cambiar el placeholder del campo a algo que empuje al formato correcto o, mejor, aceptar cualquier formato y normalizarlo con la misma función al guardar (o al menos mostrar una preview usando `getEmbedVideoUrl`, no el `.replace('watch?v=','embed/')` manual que tiene ahora mismo).

---

## 2. App Flutter — qué existe y qué falta

**Lo que ya funciona:** autenticación, catálogo de cursos, carrito, checkout/órdenes, panel admin (categorías, cursos, órdenes, usuarios). Solo consume `/api/courses/`, `/api/categories/`, `/api/orders/`, `/api/users/`.

**Lo que falta (el corazón de una app de e-learning):** la app nunca llama a estos endpoints, que ya existen y funcionan en tu backend:

| Módulo | Endpoints backend disponibles | Pantallas a crear |
|---|---|---|
| Reproductor de curso | `GET /api/modules/`, `GET /api/lessons/` | `CourseLearningScreen`: sidebar de módulos/lecciones + reproductor de video + contenido de texto |
| Progreso | `POST/PATCH /api/lesson-progress/` | Marcar lección completada, barra de progreso por curso |
| Exámenes | `POST /api/exam-attempts/`, `POST /api/exam-attempts/{id}/submit/` | `ExamScreen`: preguntas, envío de respuestas, resultado |
| Certificados | `GET /api/certificates/` | `CertificatesScreen`: listado y detalle |
| Comunidad | `/api/forum-threads/`, `/api/forum-posts/`, `/api/announcements/`, `/api/lesson-comments/` | Hilos de foro, anuncios del curso, comentarios en lección |
| Gamificación | `/api/achievements/`, `/api/reviews/` | Logros del usuario, calificar curso |

### Orden sugerido de implementación
1. **`CourseLearningScreen`** (módulos + lecciones + reproductor de video) — es el bloqueador principal, sin esto la app no sirve para "tomar" un curso.
2. **Progreso de lección** (se integra naturalmente con el paso 1).
3. **Certificados** (dependen de progreso completo).
4. **Exámenes.**
5. **Comunidad y gamificación** (menor prioridad, no bloquean el flujo core).

### Reproducción de video en Flutter
Para igualar el comportamiento correcto de la web (una vez arreglado), en Flutter conviene:
- Usar `youtube_player_flutter` o `webview_flutter` para URLs de YouTube/Vimeo.
- Usar `video_player` (paquete oficial de Flutter) para `.mp4` directos.
- Centralizar la lógica de "qué tipo de URL es esto" en una sola función/util (`lib/core/utils/video_url_resolver.dart`), replicando exactamente la lógica ya corregida de `getEmbedVideoUrl()` en la web, para que el comportamiento sea idéntico en ambas plataformas.

### Para que la app se vea como la web
Tokens de diseño detectados en el código de la web (Tailwind), para replicar en `app_colors.dart` / `app_theme.dart`:
- Acento principal: verde `#00cc33` / `#00b835` (dark mode)
- Bordes: negro/slate-950, gruesos (2px), estilo "neobrutalist"
- Sombras duras tipo `4px 4px 0px 0px rgba(0,0,0,1)` (sin blur)
- Tipografía monoespaciada para etiquetas/badges técnicos (ej. "REPRODUCTOR DE VIDEO HTML5 · ONCOURSES")
- Contenedores de video siempre en `aspect-video` (16:9)

### Nota menor sobre nomenclatura
Los modelos de la app se llaman `Product`/`Order`/`catalog` pero representan `Course`/`Enrollment`. No es un bug, pero si vas a tocar mucho este código, vale la pena evaluar un rename a `Course`/`Enrollment` para evitar confusión a futuro (puede ser un commit aparte, tipo `refactor: rename Product->Course for domain clarity`).

---

## 3. Convención de commits sugerida (buenas prácticas)

Conventional Commits, commits atómicos por funcionalidad:
```
feat(web): usar getEmbedVideoUrl en CourseDetailPage para reproducir video correctamente
fix(web): eliminar fallback de video hardcodeado en sanitize-url
feat(app): agregar CourseLearningScreen con reproductor de lecciones
feat(app): integrar endpoint lesson-progress para marcar avance
refactor(app): unificar resolución de URL de video en util compartido
```
Un commit por corrección/feature, mensajes en presente, scope entre paréntesis (`web`/`app`/`backend`), body opcional explicando el porqué cuando el cambio no sea obvio.

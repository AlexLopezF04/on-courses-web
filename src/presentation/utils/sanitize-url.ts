/**
 * Sanitiza una URL para prevenir ataques de inyección XSS mediante protocolos 'javascript:' o 'data:'.
 */
export function sanitizeUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();

  if (trimmed.toLowerCase().startsWith('javascript:')) {
    return 'about:blank';
  }

  if (trimmed.toLowerCase().startsWith('data:')) {
    return 'about:blank';
  }

  return trimmed;
}

/**
 * Convierte URLs estándar de YouTube, Vimeo y videos en URLs incrustables (embed) funcionales.
 * Si la URL está incompleta o rota, suministra un video funcional HD sobre SQL / Bases de Datos.
 */
export function getEmbedVideoUrl(url?: string): { isEmbed: boolean; isDirectVideo: boolean; embedUrl: string } {
  const fallbackEmbed = 'https://www.youtube.com/embed/kUMe1FH4CHE';

  if (!url || !url.trim()) {
    return { isEmbed: true, isDirectVideo: false, embedUrl: fallbackEmbed };
  }

  const trimmed = url.trim();

  // YouTube watch?v=ID
  const ytWatchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([^&]+)/i);
  if (ytWatchMatch && ytWatchMatch[1]) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: `https://www.youtube.com/embed/${ytWatchMatch[1]}`,
    };
  }

  // YouTube shortlink youtu.be/ID
  const ytShortMatch = trimmed.match(/(?:youtu\.be\/)([^?&]+)/i);
  if (ytShortMatch && ytShortMatch[1]) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: `https://www.youtube.com/embed/${ytShortMatch[1]}`,
    };
  }

  // Already YouTube embed
  if (trimmed.includes('youtube.com/embed/')) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: sanitizeUrl(trimmed),
    };
  }

  // Vimeo
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)([^?&]+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // Direct MP4 / WebM video file
  if (/\.(mp4|webm|ogg)$/i.test(trimmed)) {
    return {
      isEmbed: false,
      isDirectVideo: true,
      embedUrl: sanitizeUrl(trimmed),
    };
  }

  // General HTTP(S) URL: try as embed iframe, or fallback if empty
  if (/^https?:\/\//i.test(trimmed)) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: sanitizeUrl(trimmed),
    };
  }

  return { isEmbed: true, isDirectVideo: false, embedUrl: fallbackEmbed };
}

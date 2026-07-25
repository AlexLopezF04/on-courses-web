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
 * Convierte URLs de video en reproductores HTML5 directos (.mp4) o iFrames incrustados (YouTube/Vimeo).
 * Usa la copia física local del video MP4 guardada en /videos/sql_lesson_1.mp4.
 */
export function getEmbedVideoUrl(url?: string): { isEmbed: boolean; isDirectVideo: boolean; embedUrl: string } {
  // Video MP4 local guardado físicamente en la carpeta public/videos/ del proyecto
  const LOCAL_MP4_VIDEO = '/videos/sql_lesson_1.mp4';

  if (!url || !url.trim()) {
    return { isEmbed: false, isDirectVideo: true, embedUrl: LOCAL_MP4_VIDEO };
  }

  const trimmed = url.trim();

  // Direct MP4 / WebM / OGG video file or local /videos/ relative path
  if (/\.(mp4|webm|ogg)$/i.test(trimmed) || trimmed.startsWith('/videos/')) {
    return {
      isEmbed: false,
      isDirectVideo: true,
      embedUrl: sanitizeUrl(trimmed),
    };
  }

  // YouTube watch?v=11chars
  const ytWatchMatch = trimmed.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/i);
  if (ytWatchMatch && ytWatchMatch[1]) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: `https://www.youtube.com/embed/${ytWatchMatch[1]}?autoplay=0&rel=0`,
    };
  }

  // YouTube shortlink youtu.be/11chars
  const ytShortMatch = trimmed.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
  if (ytShortMatch && ytShortMatch[1]) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: `https://www.youtube.com/embed/${ytShortMatch[1]}?autoplay=0&rel=0`,
    };
  }

  // Already YouTube embed
  const ytEmbedMatch = trimmed.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/i);
  if (ytEmbedMatch && ytEmbedMatch[1]) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: `https://www.youtube.com/embed/${ytEmbedMatch[1]}?autoplay=0&rel=0`,
    };
  }

  // Vimeo (numerical ID)
  const vimeoMatch = trimmed.match(/(?:vimeo\.com\/)([0-9]+)/i);
  if (vimeoMatch && vimeoMatch[1]) {
    return {
      isEmbed: true,
      isDirectVideo: false,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    };
  }

  // Default to local physical MP4 file for 100% reliable offline/online playback
  return { isEmbed: false, isDirectVideo: true, embedUrl: LOCAL_MP4_VIDEO };
}

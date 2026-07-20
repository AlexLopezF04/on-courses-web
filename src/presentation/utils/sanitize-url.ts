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

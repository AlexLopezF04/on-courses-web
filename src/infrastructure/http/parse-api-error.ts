import axios from 'axios';

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export function parseApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    const status = error.response?.status;
    
    if (data && typeof data === 'object') {
      if ('detail' in data && typeof data.detail === 'string') {
        return { message: data.detail, status };
      }
      
      if ('non_field_errors' in data && Array.isArray(data.non_field_errors)) {
        return { message: data.non_field_errors[0], status };
      }
      
      const errors: Record<string, string[]> = {};
      let firstMessage = 'Error de validación';
      
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          errors[key] = value.map(String);
          if (firstMessage === 'Error de validación' && value.length > 0) {
            firstMessage = `${key}: ${value[0]}`;
          }
        } else if (typeof value === 'string') {
          errors[key] = [value];
          if (firstMessage === 'Error de validación') {
            firstMessage = value;
          }
        }
      }
      
      return {
        message: firstMessage,
        errors,
        status
      };
    }
    
    return {
      message: error.message || 'Error de conexión con el servidor',
      status
    };
  }
  
  if (error instanceof Error) {
    return { message: error.message };
  }
  
  return { message: 'Ha ocurrido un error inesperado' };
}

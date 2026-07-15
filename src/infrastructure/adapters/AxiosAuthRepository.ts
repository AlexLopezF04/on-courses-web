import { IAuthRepository } from '@domain/ports/IAuthRepository';
import { LoginRequestDto, LoginResponseDto } from '@application/dtos/AuthDto';
import { axiosClient } from '../http/axios-client';
import { parseApiError } from '../http/parse-api-error';

export class AxiosAuthRepository implements IAuthRepository {
  async login(credentials: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const response = await axiosClient.post('/auth/login/', credentials);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      await axiosClient.post('/auth/logout/', { refresh: refreshToken });
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async register(data: any): Promise<any> {
    try {
      const response = await axiosClient.post('/auth/register/', data);
      return response.data;
    } catch (error) {
      throw parseApiError(error);
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      const response = await axiosClient.get('/auth/profile/');
      return response.data;
    } catch (error) {
      try {
        const response = await axiosClient.get('/users/me/');
        return response.data;
      } catch {
        throw parseApiError(error);
      }
    }
  }
}

import { LoginRequestDto, LoginResponseDto } from '@application/dtos/AuthDto';

export interface IAuthRepository {
  login(credentials: LoginRequestDto): Promise<LoginResponseDto>;
  logout(refreshToken: string): Promise<void>;
  register(data: any): Promise<any>;
  getCurrentUser(userId: number): Promise<any>;
  updateCurrentUser(userId: number, data: any): Promise<any>;
}

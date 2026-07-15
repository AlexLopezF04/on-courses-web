import { LoginRequestDto, LoginResponseDto } from '@application/dtos/AuthDto';

export interface IAuthRepository {
  login(credentials: LoginRequestDto): Promise<LoginResponseDto>;
  logout(refreshToken: string): Promise<void>;
  register(data: any): Promise<any>;
  getCurrentUser(): Promise<any>; // Fetch details of authenticated user
}

import { User } from '@domain/entities/User';

export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface LoginResponseDto {
  access: string;
  refresh: string;
  user?: User;
  id?: number;
  username?: string;
  email?: string;
  role?: string;
}

export interface RegisterRequestDto {
  username: string;
  email: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
}

import { create } from 'zustand';
import { User } from '@domain/entities/User';
import { loginUseCase, authRepositoryInstance } from '@infrastructure/factories/AuthFactory';
import { LocalTokenStorage } from '@infrastructure/storage/local-token-storage';
import { LoginRequestDto } from '@application/dtos/AuthDto';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequestDto) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: LocalTokenStorage.getAccessToken(),
  isAuthenticated: !!LocalTokenStorage.getAccessToken(),
  isLoading: false,
  error: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginUseCase.execute(credentials);
      
      LocalTokenStorage.setAccessToken(response.access);
      LocalTokenStorage.setRefreshToken(response.refresh);
      
      if (response.user) {
        set({
          user: response.user,
          accessToken: response.access,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        try {
          const userProfile = await authRepositoryInstance.getCurrentUser();
          set({
            user: userProfile,
            accessToken: response.access,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          const fallbackUser: User = {
            id: response.id || 1,
            username: response.username || credentials.username,
            email: response.email || `${credentials.username}@example.com`,
            first_name: response.username || credentials.username,
            last_name: '',
            role: (response.role as any) || 'student',
            is_active: true,
          };
          set({
            user: fallbackUser,
            accessToken: response.access,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      }
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message || 'Error al iniciar sesión',
      });
      throw err;
    }
  },

  logout: async () => {
    const refresh = LocalTokenStorage.getRefreshToken();
    if (refresh) {
      try {
        await authRepositoryInstance.logout(refresh);
      } catch (err) {
        console.warn('Logout request failed', err);
      }
    }
    LocalTokenStorage.clear();
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
    });
  },

  checkAuth: async () => {
    const token = LocalTokenStorage.getAccessToken();
    if (!token) {
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
      return;
    }
    set({ isLoading: true });
    try {
      const userProfile = await authRepositoryInstance.getCurrentUser();
      set({
        user: userProfile,
        accessToken: token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      console.warn('Failed to verify token', err);
      LocalTokenStorage.clear();
      set({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },
}));

if (typeof window !== 'undefined') {
  window.addEventListener('auth-logout', () => {
    useAuthStore.getState().logout();
  });
}

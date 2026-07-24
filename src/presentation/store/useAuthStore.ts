import { create } from 'zustand';
import { User } from '@domain/entities/User';
import {
  loginUseCase,
  getCurrentUserUseCase,
  updateCurrentUserUseCase,
  logoutUseCase,
} from '@infrastructure/factories/AuthFactory';
import { LocalTokenStorage } from '@infrastructure/storage/local-token-storage';
import { LoginRequestDto } from '@application/dtos/AuthDto';
import { decodeJwt } from '../utils/jwt-helper';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginRequestDto) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (data: any) => Promise<void>;
}

const enrichUserWithCachedProfile = (user: User): User => {
  try {
    const stored = JSON.parse(localStorage.getItem('oncourses_registered_users') || '{}');
    const cached = stored[user.username.toLowerCase()] || stored[user.email.toLowerCase()];
    return {
      ...user,
      phone: user.phone || cached?.phone || '+593 99 123 4567',
      country: user.country || cached?.country || 'Ecuador',
      first_name: user.first_name || cached?.first_name || user.username,
      last_name: user.last_name || cached?.last_name || '',
    };
  } catch {
    return {
      ...user,
      phone: user.phone || '+593 99 123 4567',
      country: user.country || 'Ecuador',
    };
  }
};

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
      
      const jwtData = decodeJwt(response.access);
      if (jwtData && jwtData.user_id) {
        try {
          const userProfile = await getCurrentUserUseCase.execute(jwtData.user_id);
          set({
            user: enrichUserWithCachedProfile(userProfile),
            accessToken: response.access,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          const fallbackUser: User = {
            id: jwtData.user_id,
            username: credentials.username,
            email: `${credentials.username}@example.com`,
            first_name: credentials.username,
            last_name: '',
            role: 'student' as any,
            is_active: true,
          };
          set({
            user: enrichUserWithCachedProfile(fallbackUser),
            accessToken: response.access,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } else {
        const fallbackUser: User = {
          id: 1,
          username: credentials.username,
          email: `${credentials.username}@example.com`,
          first_name: credentials.username,
          last_name: '',
          role: 'student' as any,
          is_active: true,
        };
        set({
          user: enrichUserWithCachedProfile(fallbackUser),
          accessToken: response.access,
          isAuthenticated: true,
          isLoading: false,
        });
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
        await logoutUseCase.execute(refresh);
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
    const jwtData = decodeJwt(token);
    if (!jwtData || !jwtData.user_id) {
      LocalTokenStorage.clear();
      set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false });
      return;
    }
    set({ isLoading: true });
    try {
      const userProfile = await getCurrentUserUseCase.execute(jwtData.user_id);
      set({
        user: enrichUserWithCachedProfile(userProfile),
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

  updateProfile: async (data: any) => {
    const store = useAuthStore.getState();
    const currentUserId = store.user?.id;
    if (!currentUserId) throw new Error('No autenticado');
    
    set({ isLoading: true, error: null });
    try {
      let updatedUser: any;
      try {
        updatedUser = await updateCurrentUserUseCase.execute(currentUserId, data);
      } catch {
        updatedUser = { ...(store.user as User), ...data };
      }
      set({
        user: { ...(store.user as User), ...updatedUser, ...data },
        isLoading: false,
      });
    } catch (err: any) {
      set({
        isLoading: false,
        error: err.message || 'Error al actualizar el perfil',
      });
      throw err;
    }
  },
}));

if (typeof window !== 'undefined') {
  window.addEventListener('auth-logout', () => {
    useAuthStore.getState().logout();
  });
}

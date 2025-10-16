import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { onAuthStateChange, getCurrentUserProfile } from './authService';
import type { UserProfile } from './authService';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  authenticated: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    authenticated: false
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (user) => {
      if (user) {
        // Usuário logado - buscar perfil
        try {
          const profile = await getCurrentUserProfile(user);
          setAuthState({
            user,
            profile,
            loading: false,
            authenticated: true
          });
        } catch (error) {
          console.error('Erro ao carregar perfil do usuário:', error);
          setAuthState({
            user,
            profile: null,
            loading: false,
            authenticated: true
          });
        }
      } else {
        // Usuário não logado
        setAuthState({
          user: null,
          profile: null,
          loading: false,
          authenticated: false
        });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return authState;
};
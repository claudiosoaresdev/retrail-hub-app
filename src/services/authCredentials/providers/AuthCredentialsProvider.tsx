import React, { createContext, useEffect, useState } from 'react';

import { AuthCredentials } from '../../../domain/auth/authCredentialsTypes';
import { authService } from '../../../domain/auth/authService';
import { registerInterceptor } from '../../api/registerInterceptor';
import { AuthCredentialsProps } from '../authCredentialsTypes';
import { authCredentialsStorage } from '../authCredentialsStorage';

export const AuthCredentialsContext = createContext<AuthCredentialsProps>({
  authCredentials: null,
  isLoading: true,
  saveCredentials: async () => {},
  removeCredentials: async () => {},
});

export function AuthCredentialsProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [authCredentials, setAuthCredentials] =
    useState<AuthCredentials | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function startAuthCredentials() {
    try {
      const ac = await authCredentialsStorage.get();

      if (ac) {
        authService.updateToken(ac.accessToken);
        setAuthCredentials(ac);
      }
    } catch (error) {
      console.log('error');
    } finally {
      setIsLoading(false);
    }
  }

  async function saveCredentials(ac: AuthCredentials): Promise<void> {
    authService.updateToken(ac.accessToken);
    authCredentialsStorage.set(ac);
    setAuthCredentials(ac);
  }

  async function removeCredentials() {
    authService.removeToken();
    authCredentialsStorage.remove();
    setAuthCredentials(null);
  }

  useEffect(() => {
    startAuthCredentials();
  }, []);

  useEffect(() => {
    const interceptor = registerInterceptor({
      authCredentials,
      removeCredentials,
      saveCredentials,
    });

    return interceptor;
  }, [authCredentials]);

  return (
    <AuthCredentialsContext.Provider
      value={{
        authCredentials,
        isLoading,
        saveCredentials,
        removeCredentials,
      }
      }>
      {children}
    </AuthCredentialsContext.Provider>
  );
}
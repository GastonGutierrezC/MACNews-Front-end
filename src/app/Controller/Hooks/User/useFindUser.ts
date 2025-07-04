'use client';

import { useState } from 'react';
import { useToken } from '../../Context/UserContext';
import { loginAndGetToken } from '@/app/Model/Services/FindUserService';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setToken } = useToken();

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const { token } = await loginAndGetToken(email, password);
      console.log('[useLogin] Token recibido del backend:', token);
      setToken(token); // guardar el token en el contexto
    } catch (err: any) {
      console.error('[useLogin] Error durante login:', err);
      setError(err.message || 'Error desconocido');
      setToken(null); // limpiar token si falló
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    login,
  };
};

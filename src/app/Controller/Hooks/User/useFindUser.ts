'use client';

import { useState } from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { findUserByCredentials } from '@/app/Model/Services/FindUserService';
import { User } from '@/app/Model/Entities/FindUser';

export const useFindUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser();

  const fetchUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const user: User = await findUserByCredentials(email, password);
      console.log('[useFindUser] User fetched from API:', user); // <-- Aquí el log para navegador
      setUser(user);
    } catch (err: any) {
      console.error('[useFindUser] Error fetching user:', err);
      setError(err.message || 'Error desconocido');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    fetchUser,
  };
};


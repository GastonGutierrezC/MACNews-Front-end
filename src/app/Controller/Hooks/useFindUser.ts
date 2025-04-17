'use client';

import { useState } from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { findUserByCredentials } from '@/app/Model/Services/FindUserService';

export const useFindUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useUser(); 

  const fetchUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const user = await findUserByCredentials(email, password);
      setUser(user); 
    } catch (err: any) {
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

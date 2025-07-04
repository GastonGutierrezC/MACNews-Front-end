'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useToken } from '../../Context/UserContext';
import { useLogin } from './useFindUser';

export const useLoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { login, loading, error } = useLogin();
  const { token } = useToken(); // solo manejamos token
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await login(credentials.email, credentials.password);
  };

  useEffect(() => {
    if (token) {
      console.log('[useLoginForm] Token recibido, redirigiendo...');
      router.prefetch(ROUTES.HOME);
      router.push(ROUTES.HOME);
    }
  }, [token, router]);

  return {
    credentials,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
};

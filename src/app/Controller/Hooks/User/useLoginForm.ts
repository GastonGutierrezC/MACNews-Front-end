'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFindUser } from '@/app/Controller/Hooks/User/useFindUser';
import { useUser } from '@/app/Controller/Context/UserContext';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useLoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { fetchUser, loading, error } = useFindUser();
  const { user } = useUser();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetchUser(credentials.email, credentials.password);
  };

useEffect(() => {
  if (user) {
    console.log('[useLoginForm] Usuario recibido:', user);

    router.prefetch(ROUTES.HOME);
    router.push(ROUTES.HOME);
  }
}, [user, router]);


  return {
    credentials,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
};

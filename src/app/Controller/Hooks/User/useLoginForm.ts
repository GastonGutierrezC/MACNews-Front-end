'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFindUser } from '@/app/Controller/Hooks/User/useFindUser';
import { useUser } from '@/app/Controller/Context/UserContext';

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

      // Ya no es necesario llamar a setJournalist porque JournalistID está en user

      router.push('/pages');
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

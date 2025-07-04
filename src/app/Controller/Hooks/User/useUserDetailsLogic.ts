'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useToken } from '../../Context/UserContext';
import { useUserProfile } from './useUserProfile';


export const useUserDetailsLogic = () => {
  const { token, setToken } = useToken();
  const { profile: user } = useUserProfile(); // Renombramos profile a user para mantener compatibilidad visual
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    router.prefetch(ROUTES.HOME);
  }, [router]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleLogout = async () => {
    setToken(null);
    localStorage.removeItem('token');
    await router.push(ROUTES.HOME);
  };

  return {
    user,
    passwordVisible,
    togglePasswordVisibility,
    handleLogout,
  };
};

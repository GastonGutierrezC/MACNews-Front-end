'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useUserDetailsLogic = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Prefetch de la ruta HOME para acelerar la navegación
  useEffect(() => {
    router.prefetch(ROUTES.HOME);
  }, [router]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleLogout = async () => {
    setUser(null);
    localStorage.removeItem('user');
    await router.push(ROUTES.HOME);
  };

  return {
    user,
    passwordVisible,
    togglePasswordVisibility,
    handleLogout,
  };
};

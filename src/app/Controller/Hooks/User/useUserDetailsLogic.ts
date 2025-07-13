'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useToken } from '../../Context/UserContext';
import { useUserProfile } from './useUserProfile';

export const useUserDetailsLogic = () => {
  const { token, setToken } = useToken();
  const { profile: user, refreshProfile } = useUserProfile(); 
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

  const refreshUserProfile = useCallback(() => {
    if (refreshProfile) {
      refreshProfile();
    }
  }, [refreshProfile]);

  return {
    user,
    passwordVisible,
    togglePasswordVisibility,
    handleLogout,
    refreshUserProfile, 
  };
};

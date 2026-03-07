'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '@/app/Model/Services/getUserProfile';
import { UserProfile } from '@/app/Model/Entities/UserProfile';
import { useToken } from '../../Context/UserContext';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useToken();
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    if (!token) {
      setError('No token disponible');
      setLoading(false);
      router.push(ROUTES.HOME);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getUserProfile(token);
      setProfile(data);
    } catch (err: any) {
      console.error('[useUserProfile] Error al obtener perfil:', err);

      if (err?.response?.data?.message) {
        // Error conocido -> mostramos mensaje
        setError(err.response.data.message);
      } else {
        // Error desconocido -> redirigir a HOME
        router.push(ROUTES.HOME);
      }
    } finally {
      setLoading(false);
    }
  }, [token, router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return { 
    profile, 
    loading, 
    error, 
    refreshProfile: fetchProfile, 
  };
};

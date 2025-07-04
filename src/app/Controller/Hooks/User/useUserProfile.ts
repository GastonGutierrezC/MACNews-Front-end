// src/app/Controller/Hooks/User/useUserProfile.ts

import { useEffect, useState } from 'react';
import { getUserProfile } from '@/app/Model/Services/getUserProfile';
import { UserProfile } from '@/app/Model/Entities/UserProfile';
import { useToken } from '../../Context/UserContext';


export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useToken();

  useEffect(() => {
    if (!token) {
      setError('No token disponible');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(token);
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'Error al obtener perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  return { profile, loading, error };
};

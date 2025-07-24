'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/app/Model/Services/getUserProfile';
import { useToken } from '../../Context/UserContext';


export const useJournalistRedirect = () => {
  const router = useRouter();
  const { token } = useToken();
  const [isJournalist, setIsJournalist] = useState<boolean | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!token) {
        console.warn('[useJournalistRedirect] No token encontrado');
        setIsJournalist(null);
        return;
      }

      try {
        const profile = await getUserProfile(token);
        setIsJournalist(profile.RoleAssigned === 'Journalist');
      } catch (error) {
        console.error('[useJournalistRedirect] Error obteniendo perfil:', error);
        setIsJournalist(null);
      }
    };

    checkUserRole();

    router.prefetch(ROUTES.CHANNEL_JOURNALIST);
    router.prefetch(ROUTES.JOURNALIST_FORM);
  }, [token, router]);

  const handleRedirect = () => {
    if (isJournalist === null) {
      router.push(ROUTES.LOGIN);
    } else if (isJournalist) {
      router.push(ROUTES.CHANNEL_JOURNALIST);
    } else {
      router.push(ROUTES.JOURNALIST_FORM);
    }
  };

  return { handleRedirect, isJournalist };
};

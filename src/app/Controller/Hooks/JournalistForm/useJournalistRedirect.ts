'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/app/Model/Services/getUserProfile';
import { useToken } from '../../Context/UserContext';

export const useJournalistRedirect = () => {
  const router = useRouter();
  const { token } = useToken();
  const [userRole, setUserRole] = useState<'Journalist' | 'Administrator' | 'User' | null>(null);

  useEffect(() => {
    const checkUserRole = async () => {
      if (!token) {
        console.warn('[useJournalistRedirect] No token encontrado');
        setUserRole(null);
        return;
      }

      try {
        const profile = await getUserProfile(token);

        if (profile.RoleAssigned === 'Journalist') {
          setUserRole('Journalist');
        } else if (profile.RoleAssigned === 'Administrator') {
          setUserRole('Administrator');
        } else {
          setUserRole('User');
        }
      } catch (error) {
        console.error('[useJournalistRedirect] Error obteniendo perfil:', error);
        setUserRole(null);
      }
    };

    checkUserRole();

    router.prefetch(ROUTES.CHANNEL_JOURNALIST);
    router.prefetch(ROUTES.JOURNALIST_FORM);
    router.prefetch(ROUTES.ADMIN_REPORTS);
  }, [token, router]);

  const handleRedirect = () => {
    switch (userRole) {
      case 'Journalist':
        router.push(ROUTES.CHANNEL_JOURNALIST);
        break;
      case 'Administrator':
        router.push(ROUTES.ADMIN_REPORTS);
        break;
      case 'User':
        router.push(ROUTES.JOURNALIST_FORM);
        break;
      default:
        router.push(ROUTES.LOGIN);
    }
  };

  return { handleRedirect, userRole };
};

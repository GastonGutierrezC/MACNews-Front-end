'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useUserRedirect = () => {
  const router = useRouter();

  // Prefetch para cargar de antemano la ruta perfil
  useEffect(() => {
    router.prefetch(ROUTES.PROFILE_USER);
  }, [router]);

  const redirectToProfile = () => {
    router.push(ROUTES.PROFILE_USER);
  };

  return { redirectToProfile };
};

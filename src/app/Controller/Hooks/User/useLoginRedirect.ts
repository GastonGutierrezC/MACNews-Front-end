'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useLoginRedirect = () => {
  const router = useRouter();

  // Prefetch para acelerar la navegación a la ruta LOGIN
  useEffect(() => {
    router.prefetch(ROUTES.LOGIN);
  }, [router]);

  const redirectToLogin = () => {
    router.push(ROUTES.LOGIN);
  };

  return { redirectToLogin };
};

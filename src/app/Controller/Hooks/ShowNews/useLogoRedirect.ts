'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useLogoRedirect = () => {
  const router = useRouter();

  const redirectToHome = async () => {
    await router.prefetch(ROUTES.HOME);
    router.push(ROUTES.HOME);
  };

  return { redirectToHome };
};

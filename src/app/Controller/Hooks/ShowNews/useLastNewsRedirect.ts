'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useLastNewsRedirect = () => {
  const router = useRouter();

  const redirectToLastNews = async () => {
    await router.prefetch(ROUTES.LAST_NEWS);
    router.push(ROUTES.LAST_NEWS);
  };

  return { redirectToLastNews };
};

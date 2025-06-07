'use client';

import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useRouter } from 'next/navigation';

export const useHandleTopNewsClick = () => {
  const router = useRouter();

  const handleTopNewsClick = async (title: string, date: string) => {
    await router.prefetch(ROUTES.NEWS_DETAIL(title, date));
    router.push(ROUTES.NEWS_DETAIL(title, date));
  };

  return { handleTopNewsClick };
};

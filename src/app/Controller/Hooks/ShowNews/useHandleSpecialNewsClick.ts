'use client';

import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useRouter } from 'next/navigation';

export const useHandleSpecialNewsClick = () => {
  const router = useRouter();

  const handleSpecialNewsClick = async (title: string, date: string) => {
    await router.prefetch(ROUTES.NEWS_DETAIL(title, date));
    router.push(ROUTES.NEWS_DETAIL(title, date));
  };

  return { handleSpecialNewsClick };
};

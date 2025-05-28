
// app/Controller/Hooks/ShowNews/useHandleSpecialNewsClick.ts
'use client';

import { useRouter } from 'next/navigation';

export const useHandleSpecialNewsClick = () => {
  const router = useRouter();

  const handleSpecialNewsClick = (NewsID: string) => {
    localStorage.setItem('selectedNewsId', NewsID);
    router.push('/pages/news');
  };

  return { handleSpecialNewsClick };
};

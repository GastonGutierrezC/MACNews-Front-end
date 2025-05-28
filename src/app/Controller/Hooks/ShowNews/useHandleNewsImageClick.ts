// app/Controller/Hooks/ShowNews/useHandleNewsImageClick.ts
'use client';

import { useRouter } from 'next/navigation';

export const useHandleNewsImageClick = () => {
  const router = useRouter();

  const handleNewsImageClick = (NewsID: string) => {
    localStorage.setItem('selectedNewsId', NewsID);

    const savedId = localStorage.getItem('selectedNewsId');
    console.log('ID guardado en localStorage:', savedId);

    setTimeout(() => {
      router.push('/pages/news');
    }, 100);
  };

  return { handleNewsImageClick };
};

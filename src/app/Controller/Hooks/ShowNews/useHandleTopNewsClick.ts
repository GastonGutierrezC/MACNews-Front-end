'use client';

import { useRouter } from 'next/navigation';

export const useHandleTopNewsClick = () => {
  const router = useRouter();

  const handleTopNewsClick = (newsId: string) => {
    localStorage.setItem('selectedNewsId', newsId);

    const savedId = localStorage.getItem('selectedNewsId');
    console.log('ID guardado en localStorage:', savedId);

    setTimeout(() => {
      router.push('/pages/news');
    }, 100);
  };

  return { handleTopNewsClick };
};

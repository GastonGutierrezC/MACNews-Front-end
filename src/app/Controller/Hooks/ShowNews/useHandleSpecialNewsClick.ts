
// app/Controller/Hooks/ShowNews/useHandleSpecialNewsClick.ts
'use client';

import { useRouter } from 'next/navigation';

export const useHandleSpecialNewsClick = () => {
  const router = useRouter();

  const handleSpecialNewsClick = (title: string, date: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedDate = encodeURIComponent(date);
    router.push(`/pages/news/${encodedTitle}/${encodedDate}`);
  };

  return { handleSpecialNewsClick };
};

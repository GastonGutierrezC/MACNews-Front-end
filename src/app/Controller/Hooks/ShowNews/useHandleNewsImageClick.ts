'use client';

import { useRouter } from 'next/navigation';

export const useHandleNewsImageClick = () => {
  const router = useRouter();

  const handleNewsImageClick = (title: string, date: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedDate = encodeURIComponent(date);
    router.push(`/pages/news/${encodedTitle}/${encodedDate}`);
  };

  return { handleNewsImageClick };
};

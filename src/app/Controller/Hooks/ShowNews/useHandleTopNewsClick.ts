'use client';

import { useRouter } from 'next/navigation';

export const useHandleTopNewsClick = () => {
  const router = useRouter();

  const handleTopNewsClick = (title: string, date: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedDate = encodeURIComponent(date);
    router.push(`/pages/news/${encodedTitle}/${encodedDate}`);

  };

  return { handleTopNewsClick };
};

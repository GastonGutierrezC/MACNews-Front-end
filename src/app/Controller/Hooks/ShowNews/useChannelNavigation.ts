'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export const useChannelNavigation = () => {
  const router = useRouter();

const navigateToChannel = async (channelName: string, creatorFullName: string) => {
  await router.prefetch(ROUTES.CHANNEL_NEWS(channelName, creatorFullName));
  router.push(ROUTES.CHANNEL_NEWS(channelName, creatorFullName));
};


  return { navigateToChannel };
};

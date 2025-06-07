'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/app/Controller/Context/UserContext';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { useEffect } from 'react';

export const useJournalistRedirect = () => {
  const { user } = useUser();
  const router = useRouter();

  const isJournalist = user?.RoleAssigned === 'Journalist';

  useEffect(() => {
    router.prefetch(ROUTES.CHANNEL_JOURNALIST);
    router.prefetch(ROUTES.JOURNALIST_FORM);
  }, [router]);

  const handleRedirect = () => {
    if (isJournalist) {
      router.push(ROUTES.CHANNEL_JOURNALIST);
    } else {
      router.push(ROUTES.JOURNALIST_FORM);
    }
  };

  return { handleRedirect, isJournalist };
};

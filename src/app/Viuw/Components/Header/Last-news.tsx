'use client';

import { useLastNewsRedirect } from '@/app/Controller/Hooks/ShowNews/useLastNewsRedirect';
import { Button } from '@/components/ui/button';
import React from 'react';


const LastNewsRedirectButton: React.FC = () => {
  const { redirectToLastNews } = useLastNewsRedirect();

  return (
    <Button variant="filterNews" onClick={redirectToLastNews}>
      Últimas Noticias
    </Button>
  );
};

export default LastNewsRedirectButton;

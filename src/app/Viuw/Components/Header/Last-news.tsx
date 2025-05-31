'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

const LastNewsRedirectButton: React.FC = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('http://localhost:3001/pages/last-news');
  };

  return (
    <Button variant="bluehover" onClick={handleClick}>
      Últimas Noticias
    </Button>
  );
};

export default LastNewsRedirectButton;

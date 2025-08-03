'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { useHandleNewsImageClick } from '@/app/Controller/Hooks/ShowNews/useHandleNewsImageClick';
import { useChannelNavigation } from '@/app/Controller/Hooks/ShowNews/useChannelNavigation';

interface NewsImageProps {
  newsImageUrl: string;
  channelImageUrl: string;
  channelName: string;
  title: string;
  publicationDate: string;
  NewsID: string;
  creatorFullName: string;
}

export const NewsImage: React.FC<NewsImageProps> = ({
  newsImageUrl,
  channelImageUrl,
  channelName,
  title,
  publicationDate,
  creatorFullName,
  NewsID,
}) => {
  const { handleNewsImageClick } = useHandleNewsImageClick();
  const { navigateToChannel } = useChannelNavigation();

  return (
    <div className="relative w-110 h-60 rounded-xl overflow-hidden shadow-md group">
      {/* Imagen de fondo */}
      <Button
        onClick={() => handleNewsImageClick(title, publicationDate)}
        style={{ backgroundImage: `url(${newsImageUrl})` }}
        className="absolute inset-0 w-full h-full bg-cover bg-center transition duration-300 group-hover:brightness-75 z-0"
      />


    </div>
  );
};

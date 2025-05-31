'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { useHandleNewsImageClick } from '@/app/Controller/Hooks/ShowNews/useHandleNewsImageClick';
import { useRouter } from 'next/navigation';

interface NewsImageProps {
  newsImageUrl: string;
  channelImageUrl: string;
  channelName: string;
  title: string;
  publicationDate: string;
  NewsID: string;
  creatorFullName: string; // <--- Nuevo
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

  const router = useRouter();

const handleChannelClick = () => {
  const encodedChannel = encodeURIComponent(channelName);
  const encodedCreator = encodeURIComponent(creatorFullName);
  router.push(`/pages/channel-news/${encodedChannel}/${encodedCreator}`);
};


  return (
    <div className="relative w-110 h-60 rounded-xl overflow-hidden shadow-md group">
      {/* Imagen de fondo que cubre completamente el contenedor */}
      <Button
        onClick={() => handleNewsImageClick(title,publicationDate )}
        style={{ backgroundImage: `url(${newsImageUrl})` }}
        className="absolute inset-0 w-full h-full bg-cover bg-center transition duration-300 group-hover:brightness-75 z-0"
      />

      {/* Canal info sobre la imagen */}
      <div
        className="absolute bottom-3 left-3 flex flex-col items-start gap-1 sm:gap-2"
      >
        <Button
          variant="channel2"
          onClick={handleChannelClick}
          style={{ paddingLeft: '73px' }}
          className="text-sm sm:text-base"
        >
          {channelName}
        </Button>

        <Avatar
          onClick={handleChannelClick}
          className="border-4 cursor-pointer"
          style={{
            width: 75,
            height: 75,
            marginTop: -85,
          }}
        >
          <AvatarImage src={channelImageUrl} alt={channelName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

      </div>
    </div>
  );
};

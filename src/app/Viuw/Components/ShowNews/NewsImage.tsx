'use client';

import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { useHandleNewsImageClick } from '@/app/Controller/Hooks/ShowNews/useHandleNewsImageClick';

interface NewsImageProps {
  newsImageUrl: string;
  channelImageUrl: string;
  channelName: string;
  NewsID: string;
}

export const NewsImage: React.FC<NewsImageProps> = ({
  newsImageUrl,
  channelImageUrl,
  channelName,
  NewsID,
}) => {
  const { handleNewsImageClick } = useHandleNewsImageClick();

  return (
    <div className="relative w-94 h-60 rounded-xl overflow-hidden shadow-md group">
      <Button
        variant="imagebg"
        key={NewsID}
        onClick={() => handleNewsImageClick(NewsID)}
        style={{ backgroundImage: `url(${newsImageUrl})` }}
      />

      <div className="absolute bottom-1 left-1 flex flex-col items-start gap-1">
        <div>
          <Button variant="channel" className="pl-18">
            {channelName}
          </Button>
        </div>

        <Avatar className="w-20 h-20 -mt-20 border-3">
          <AvatarImage src={channelImageUrl} alt={channelName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

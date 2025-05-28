'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useHandleSpecialNewsClick } from '@/app/Controller/Hooks/ShowNews/useHandleSpecialNewsClick';

interface SpecialNewsProps {
  imageUrl: string;
  category: string;
  title: string;
  channelName: string;
  channelImageUrl: string;
  publicationDate: string;
  visitCount: number;
  NewsID: string;
}

export const SpecialNews: React.FC<SpecialNewsProps> = ({
  imageUrl,
  category,
  title,
  channelName,
  channelImageUrl,
  publicationDate,
  visitCount,
  NewsID,
}) => {
  const { handleSpecialNewsClick } = useHandleSpecialNewsClick();

  return (
    <Card
      className="
        relative 
        w-full 
        max-w-[880px] 
        sm:max-w-[720px] 
        md:max-w-[640px] 
        lg:max-w-[880px] 
        h-[400px] 
        sm:h-[520px] 
        md:h-[600px] 
        lg:h-[760px] 
        rounded-xl 
        overflow-hidden 
        shadow-lg 
        group
        flex
        flex-col
      "
    >
      <Button
        variant="imagebg"
        onClick={() => handleSpecialNewsClick(NewsID)}
        style={{ backgroundImage: `url(${imageUrl})` }}
        className="flex items-center justify-center text-white font-bold p-4 bg-black bg-opacity-30text-lg sm:text-xl md:text-2xlh-fullw-full"
      >
        {title}
      </Button>

      <div className="absolute top-4 left-4 flex">
        <Badge variant="split" className="text-xs sm:text-sm">
          Categoria: {category}
        </Badge>
      </div>

      <div
        className="absolute bottom-15 left-5 flex flex-col items-start gap-1 sm:gap-2"
      >
        <Button
          variant="channel"
          style={{ paddingLeft: '93px' }}
          className="text-sm sm:text-base"
        >
          {channelName}
        </Button>

        <Avatar
          className="border-4"
          style={{
            width: 95,
            height: 95,
            marginTop: -95,
          }}
        >
          <AvatarImage src={channelImageUrl} alt={channelName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div
        className="absolute bottom-6 right-6 flex flex-row items-center gap-2 sm:gap-4 text-righttext-xs sm:text-sm"
      >
        <Badge variant="data">{publicationDate}</Badge>
        <Badge variant="data">{visitCount} vistas</Badge>
      </div>
    </Card>
  );
};

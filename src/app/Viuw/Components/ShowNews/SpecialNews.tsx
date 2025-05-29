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
  onClick={() => handleSpecialNewsClick(title,publicationDate)}
  variant="imagebg"
>
  {/* Fondo con imagen y efecto brillo al hacer hover */}
  <span
    className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:brightness-75"
    style={{ backgroundImage: `url(${imageUrl})` }}
  ></span>

  {/* Texto encima, sin afectarse */}
  <span className="relative z-10 text-white text-4xl font-bold drop-shadow-lg">
    {title}
  </span>
</Button>





      <div className="absolute top-4 left-4 flex">
        <Badge variant="userData5" className="text-xs sm:text-sm">
          {category}
        </Badge>
      </div>

      <div
        className="absolute bottom-5 left-5 flex flex-col items-start gap-1 sm:gap-2"
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

        <div className="flex items-center gap-x-2 mt-2">
  <Badge variant="data">{publicationDate}</Badge>
  <Badge variant="data">vistas: {visitCount}</Badge>
</div>

      </div>

    </Card>
  );
};

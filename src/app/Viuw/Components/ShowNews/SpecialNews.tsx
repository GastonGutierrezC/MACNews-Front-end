'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useHandleSpecialNewsClick } from '@/app/Controller/Hooks/ShowNews/useHandleSpecialNewsClick';
import { useChannelNavigation } from '@/app/Controller/Hooks/ShowNews/useChannelNavigation';
import Image from 'next/image';

interface SpecialNewsProps {
  imageUrl: string;
  category: string;
  title: string;
  channelName: string;
  channelImageUrl: string;
  publicationDate: string;
  visitCount: number;
  NewsID: string;
  creatorFullName: string;
}

export const SpecialNews: React.FC<SpecialNewsProps> = ({
  imageUrl,
  category,
  title,
  channelName,
  channelImageUrl,
  publicationDate,
  visitCount,
  creatorFullName,
}) => {
  const { handleSpecialNewsClick } = useHandleSpecialNewsClick();
  const { navigateToChannel } = useChannelNavigation();

  return (
    <div className="relative flex items-center justify-center">
      {/* Imagen decorativa izquierda */}
      <div className="hidden sm:block relative w-[350px] h-[550px]">
        <Image
          src="https://res.cloudinary.com/dk2ycpyri/image/upload/v1753838205/certificados/Screenshot_from_2025-07-29_21-12-40-removebg-preview-Pica.png"
          alt="Decoración izquierda"
          fill
          style={{ objectFit: 'contain', objectPosition: 'right center' }}
        />
      </div>

      {/* Tarjeta principal */}
      <Card
        className="
          relative
          w-full
          max-w-[1270px]
          h-[550px]
          rounded-xl
          overflow-hidden
          shadow-lg
          group
          z-10
        "
      >
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Degradado oscuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 text-white to-transparent"></div>

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
          <Badge variant="split" className="mb-2 w-fit">
            {category}
          </Badge>

          <h2 className="text-2xl sm:text-3xl font-bold leading-snug drop-shadow-lg">
            {title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm sm:text-base">
            <div className="flex gap-3">
              <Badge variant="default">{publicationDate}</Badge>
              <Badge variant="default">Vistas: {visitCount}</Badge>
            </div>

            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigateToChannel(channelName, creatorFullName)}
            >
              <Avatar className="w-10 h-10 border-2">
                <AvatarImage src={channelImageUrl} alt={channelName} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span className="font-medium">{channelName}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => handleSpecialNewsClick(title, publicationDate)}
          variant="ghost"
          className="absolute inset-0 opacity-0"
          aria-label={`Abrir noticia: ${title}`}
        />
      </Card>

      {/* Imagen decorativa derecha */}
      <div className="hidden sm:block relative w-[350px] h-[550px]">
        <Image
          src="https://res.cloudinary.com/dk2ycpyri/image/upload/v1753838227/certificados/Screenshot_from_2025-07-29_21-13-19-removebg-preview-Pica.png"
          alt="Decoración derecha"
          fill
          style={{ objectFit: 'contain', objectPosition: 'right center' }}
        />
      </div>
    </div>
  );
};

'use client';

import { useChannelNavigation } from '@/app/Controller/Hooks/ShowNews/useChannelNavigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React from 'react';

interface NewsDetailsProps {
  category: string;
  title: string;
  publicationDate: string;
  visitCount: number;
  ChannelID: string;
  channelName: string;
  channelImageUrl: string;
  creatorFullName: string;
}

export const NewsDetails: React.FC<NewsDetailsProps> = ({
  category,
  title,
  publicationDate,
  visitCount,
  channelName,
  channelImageUrl,
  creatorFullName,
}) => {
  const { navigateToChannel } = useChannelNavigation();

  return (
    <div className="w-full p-2 flex flex-col text-left bg-white rounded-lg shadow-sm">
      
      {/* Categoría y canal en extremos */}
      <div className="flex justify-between items-center">

        <div
          role="button"
          tabIndex={0}
          className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          onClick={() => navigateToChannel(channelName, creatorFullName)}
          onKeyDown={(e) =>
            e.key === 'Enter' && navigateToChannel(channelName, creatorFullName)
          }
        >
          <Avatar className="w-9 h-9 border-2">
            <AvatarImage src={channelImageUrl} alt={channelName} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>


          <span className="font-medium">{channelName}</span>
          
        </div>
        <Badge variant="default" > {category}</Badge>

      </div>
      {/* Título */}
      <h2 className="text-lg font-semibold line-clamp-2 leading-snug break-words mt-2">
        {title}
      </h2>



            {/* Fecha y vistas en extremos */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <span>{publicationDate}</span>
        <span>{visitCount.toLocaleString()} vistas</span>
      </div>

    </div>
  );
};

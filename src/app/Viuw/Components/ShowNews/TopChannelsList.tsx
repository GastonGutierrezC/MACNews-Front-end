'use client';

import React from 'react';
import { useTopChannels } from '@/app/Controller/Hooks/Channels/useTopChannels';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useChannelNavigation } from '@/app/Controller/Hooks/ShowNews/useChannelNavigation';

export default function TopChannelsList() {
  const { channels, loading, error } = useTopChannels();
  const { navigateToChannel } = useChannelNavigation();

  if (loading) {
    return (
      <div className="flex  justify-center p-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-36 h-48 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) return <p className="text-center text-red-600">Error al cargar canales: {error}</p>;

  return (
    <div className="p-4 max-w-full overflow-x-auto">
      <h2 className="text-4xl font-bold text-center mb-6 gothic-title">
  🔥    Canales más populares
     </h2>

      <div className="flex gap-8 justify-center">
        {channels.slice(0, 5).map((channel) => (
          <Card
            key={channel.channelId}
            className="w-46 flex flex-col items-center p-4 hover:shadow-lg transition duration-300 cursor-pointer"
          >
            <Avatar
              onClick={() => navigateToChannel(channel.channelName, channel.CreatorFullName)}
              className="w-[164px] h-[164px] "
            >
              <AvatarImage src={channel.channelImageUrl} alt={channel.channelName} />
              <AvatarFallback>{channel.channelName.slice(0, 2)}</AvatarFallback>
            </Avatar>

            <Badge variant="titleGradient" className="text-center font-semibold text-lg ">{channel.channelName}</Badge>
            <p className="text-center text-sm text-muted-foreground">
              {channel.followers} seguidores
            </p>
            {/* Especialidades en dos columnas */}
            <div className="grid grid-cols-2 gap-2  w-full justify-center">
              {channel.specialties.map((spec) => (
                <Badge key={spec} variant="secondary" className="text-xs px-2 py-1 text-center">
                  {spec}
                </Badge>
              ))}
            </div>


          </Card>
        ))}
      </div>
    </div>
  );
}

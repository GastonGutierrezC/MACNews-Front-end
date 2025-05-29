'use client';

import React from 'react';
import { useTopChannels } from '@/app/Controller/Hooks/Channels/useTopChannels';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export const TopChannelsList: React.FC = () => {
  const { channels, loading, error } = useTopChannels();

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="p-4 flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-20" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold mt-10">
        Error al cargar los canales más populares.
      </div>
    );
  }

  return (
    <div className="p-9 space-y-6">
      <h2 className="text-2xl font-bold text-center">🔥 Canales más populares</h2>
      <div className="flex flex-col gap-3 items-center">
        {channels.slice(0, 5).map((channel) => (
          <Card
            key={channel.channelId}
            className="bg-[#B8D1E7] w-full max-w-5xl hover:shadow-lg transition duration-300"
          >
            <CardHeader className="flex flex-row items-center gap-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src={channel.channelImageUrl} alt={channel.channelName} />
                <AvatarFallback>{channel.channelName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold">
                    {channel.channelName}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    ({channel.followers} seguidores)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {channel.specialties.map((spec) => (
                    <Badge key={spec} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TopChannelsList;

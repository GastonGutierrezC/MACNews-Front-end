'use client';

import React from 'react';
import { useTopChannels } from '@/app/Controller/Hooks/Channels/useTopChannels';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

export default function TopChannelsList() {
  const { channels, loading, error } = useTopChannels();

  if (loading) return <p>Cargando canales...</p>;
  if (error) return <p>Error al cargar canales: {error}</p>;

  return (
    <div className="p-9 space-y-1 w-full max-w-xl mx-auto flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center">🔥 Canales más populares</h2>
      <div className="flex flex-col gap-3 w-full">
        {channels.slice(0, 5).map((channel) => (
          <Card
            key={channel.channelId}
            className="bg-[#B8D1E7] w-full hover:shadow-lg transition duration-300"
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
}

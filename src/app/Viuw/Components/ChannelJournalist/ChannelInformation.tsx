'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { FaInfoCircle } from 'react-icons/fa';
import React from 'react';
import { useFollowChannel } from '@/app/Controller/Hooks/User/useFollowChannel';
import { useFollowedChannels } from '@/app/Controller/Hooks/User/useFollowedChannels';
import { Badge } from '@/components/ui/badge';
import { useUnfollowChannel } from '@/app/Controller/Hooks/Channels/useUnfollowChannel';

interface ChannelInformationProps {
  channel: {
    ChannelName: string;
    DescriptionChannel: string;
    Specialties: string[];
    ChannelImageURL: string;
    Specialty: string;
    JournalisticExperience: string;
    creatorFullName: string;
    followers: number;
    NumberNews: number;
    ChannelId: string;
  };
}

const ChannelInformation: React.FC<ChannelInformationProps> = ({ channel }) => {
  const channelId = channel.ChannelId;

  // Hooks
  const { follow, loading: followLoading } = useFollowChannel(channelId);
  const { removeFollow, loading: unfollowLoading } = useUnfollowChannel();
  const { channels: followedChannels, loading: channelsLoading, refreshChannels } = useFollowedChannels();

  const isFollowing = followedChannels.some(c => c.ChannelID === channelId);

  const isLoading = followLoading || unfollowLoading || channelsLoading;

  const handleFollow = async () => {
    await follow();
    refreshChannels();
  };

  const handleUnfollow = async () => {
    await removeFollow(channelId);
    refreshChannels();
  };

  return (
    <div className="w-full p-6 rounded-xl shadow-md bg-white">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          <Avatar className="w-52 h-52 sm:w-52 sm:h-52 border-4">
            <AvatarImage src={channel.ChannelImageURL} alt={channel.ChannelName} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold">{channel.ChannelName}</h1>
            <p className="text-gray-600">{channel.creatorFullName}</p>
            <p className="text-gray-500 text-sm">
              {channel.followers} suscriptores • {channel.NumberNews} noticias
            </p>

            {/* Botón dinámico */}
            <div className="flex items-center gap-4 pt-2">
              {!isFollowing ? (
                <Button variant="bluehover" onClick={handleFollow} disabled={isLoading}>
                  {isLoading ? 'Procesando...' : 'Suscribirse'}
                </Button>
              ) : (
                <Button variant="bluehover" onClick={handleUnfollow} disabled={isLoading}>
                  {isLoading ? 'Procesando...' : 'Dejar de seguir'}
                </Button>
              )}

              <Popover>
                <PopoverTrigger asChild>
                  <div className="cursor-pointer text-orange-600 hover:text-orange-800">
                    <FaInfoCircle size={22} title="Ver información del periodista" />
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  sideOffset={8}
                  className="w-80 p-4 shadow-lg rounded-xl overflow-y-auto z-10"
                  align="start"
                >
                  <div className="space-y-2">
                    <h3 className="font-semibold text-sm text-gray-700">Especialidad principal</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{channel.Specialty}</p>
                    <hr />
                    <h3 className="font-semibold text-sm text-gray-700">Sobre el periodista</h3>
                    <p className="text-sm text-gray-600 whitespace-pre-line">{channel.JournalisticExperience}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Descripción del canal */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">Descripción del canal</h2>
          <p className="text-justify text-gray-700 whitespace-pre-line">{channel.DescriptionChannel}</p>
          <div className="flex flex-wrap gap-2 mt-15">
            {channel.Specialties.map(spec => (
              <Badge key={spec} variant="default">{spec}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelInformation;

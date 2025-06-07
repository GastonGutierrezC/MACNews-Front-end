'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import ChannelInformation from '../ChannelJournalist/ChannelInformation';
import ChannelNews from '../ChannelJournalist/ChannelNews/ChannelNews';
import { useChannelByNameAndCreator } from '@/app/Controller/Hooks/Channels/useChannelDetail';
import { CommentsList } from '../ChannelJournalist/ChannelPostComments/ChannelComments';
import { useUser } from '@/app/Controller/Context/UserContext';

interface ChannelViewProps {
  channelName: string;
  creatorFullName: string;
}

const ChannelView: React.FC<ChannelViewProps> = ({ channelName, creatorFullName }) => {
  const { channelData, loading, error } = useChannelByNameAndCreator(channelName, creatorFullName);
  const [selectedView, setSelectedView] = useState<'news' | 'comments' | 'metrics' | 'create'>('news');
  const { user } = useUser();
  const userId = user?.id ?? null; 
  if (loading) return <p>Cargando información del canal...</p>;
  if (error) return <p>Error al obtener el canal: {error}</p>;
  if (!channelData) return <p>No se encontró información del canal.</p>;

  return (
    <div className="min-h-screen pt-24 w-full px-4">
      <ChannelInformation channel={channelData} />

      <div className="flex space-x-4 mt-6">
        <Button variant="bluehover3" onClick={() => setSelectedView('news')}>
          Noticias
        </Button>
        <Button variant="bluehover3" onClick={() => setSelectedView('comments')}>
          Post de Comentarios
        </Button>
      </div>

      <hr className="mt-4 border-t-2 border-black" />

      <div className="mt-8">
        {selectedView === 'news' && (
          <ChannelNews channelId={channelData.ChannelId} />
        )}
        {selectedView === 'comments' && <CommentsList channelId={channelData.ChannelId} userId={userId} />}
      
      
      </div>
    </div>
  );
};

export default ChannelView;

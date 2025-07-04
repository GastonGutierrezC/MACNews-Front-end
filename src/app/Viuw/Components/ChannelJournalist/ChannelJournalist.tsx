'use client';

import React, { useEffect, useState } from 'react';
import ChannelInformation from './ChannelInformation';
import { useChannelByJournalist } from '@/app/Controller/Hooks/Channels/useChannelByJournalist';
import { Button } from '@/components/ui/button';
import CreationNews from './CreationNews/CreationNews';
import ChannelNews from './ChannelNews/ChannelNews';
import { CommentsList } from './ChannelPostComments/ChannelComments';
import ChannelMetrics from './ChannelMetricts/ChannelMetrics';

const ChannelJournalist: React.FC = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { channelData, loading, error } = useChannelByJournalist();
  const [selectedView, setSelectedView] = useState<'news' | 'comments' | 'metrics' | 'create'>('news');

  if (!token) return <p>No autorizado. Debes iniciar sesión.</p>;
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
        <Button variant="bluehover3" onClick={() => setSelectedView('metrics')}>
          Métricas del Canal
        </Button>
        <Button variant="bluehover3" onClick={() => setSelectedView('create')}>
          Crear una nueva Noticia
        </Button>
      </div>

      <hr className="mt-4 border-t-2 border-black" />

      <div className="mt-8">
        {selectedView === 'news' && <ChannelNews channelId={channelData.ChannelId} />}
        {selectedView === 'comments' && <CommentsList channelId={channelData.ChannelId} userId={token} />}
        {selectedView === 'metrics' && <ChannelMetrics channelId={channelData.ChannelId} />}
        {selectedView === 'create' && <CreationNews channelID={channelData.ChannelId} />}
      </div>
    </div>
  );
};

export default ChannelJournalist;

// src/Components/ChannelJournalist.tsx

import React from 'react';
import ChannelInformation from './ChannelInformation';
import { useChannelByJournalist } from '@/app/Controller/Hooks/useChannelByJournalist';
import { Button } from '@/components/ui/button';

const ChannelJournalist: React.FC = () => {
  const { channelData, loading, error } = useChannelByJournalist();

  if (loading) return <p>Cargando información del canal...</p>;
  if (error) return <p>Error al obtener el canal: {error}</p>;
  if (!channelData) return <p>No se encontró información del canal.</p>;

  return (
    <div className="min-h-screen pt-64 w-full px-4">
      <ChannelInformation channel={channelData} />

      <div className="flex space-x-4 mt-6">
        <Button variant="bluehover3">
          Noticias
        </Button>
        <Button variant="bluehover3">
          Post de Comentarios
        </Button>
        <Button variant="bluehover3">
          Métricas del Canal
        </Button>
        <Button variant="bluehover3">
          Crear una nueva Noticia
        </Button>

      </div>

      <hr className="mt-4 border-t-2 border-black" />
    </div>
  );
};

export default ChannelJournalist;

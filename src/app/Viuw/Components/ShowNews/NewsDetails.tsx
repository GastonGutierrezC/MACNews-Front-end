import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFollowChannel } from '@/app/Controller/Hooks/useFollowChannel';

interface NewsDetailsProps {
  category: string;
  title: string;
  publicationDate: string;
  visitCount: number;
  ChannelID: string;
}

export const NewsDetails: React.FC<NewsDetailsProps> = ({
  category,
  title,
  publicationDate,
  visitCount,
  ChannelID,
}) => {
  const { follow, loading, error } = useFollowChannel(ChannelID);

  const handleSubscribe = () => {
    follow();
  };

  return (
    <div className="w-94 h-60 bg-[#B8D1E7] rounded-xl shadow-md p-4 flex flex-col justify-between">
      <div className="text-center">
        <div className="flex justify-center items-center gap-1">
          <Badge variant="split">Categoría: {category}</Badge>
          <Button variant="bluehover" onClick={handleSubscribe} disabled={loading}>
            {loading ? 'Suscribiendo...' : 'Suscribirse'}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        <h2 className="text-3xl font-semibold mt-7 line-clamp-2 leading-snug break-words">
          {title}
        </h2>
      </div>
      <div className="flex gap-4 mt-2 justify-center">
        <Badge variant="data">{publicationDate}</Badge>
        <Badge variant="data">{visitCount} vistas</Badge>
      </div>
    </div>
  );
};

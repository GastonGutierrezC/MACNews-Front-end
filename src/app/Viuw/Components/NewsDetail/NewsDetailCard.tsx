'use client';

import { NewsDetail } from '@/app/Model/Entities/NewsDetail';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useFollowChannel } from '@/app/Controller/Hooks/User/useFollowChannel';
import NewsByChannelAndCategory from './NewsByChannelAndCategory';
import { useChannelNavigation } from '@/app/Controller/Hooks/ShowNews/useChannelNavigation';

interface Props {
  news: NewsDetail;
}

const NewsDetailCard = ({ news }: Props) => {
  const channelId = news?.Channel?.ChannelID ?? null;
  const { follow, loading, error } = useFollowChannel(channelId);
  const { navigateToChannel } = useChannelNavigation();

  if (!news) {
    return <p>No hay información de la noticia.</p>;
  }

  const handleChannelClick = () => {
    navigateToChannel(news.Channel.ChannelName, news.CreatorFullName);
  };

  return (
    <div className="pt-24 max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-md space-y-6">
      
      <div className="flex justify-center">
        <Badge variant="title">{news.Title}</Badge>
      </div>

      <div className="relative">
        <img
          src={news.NewsImageURL}
          alt="Imagen de la noticia"
          className="w-full h-140 object-cover rounded-lg"
        />

        {/* Botón Suscribirse */}
        <Button variant="bluehover2" onClick={follow} disabled={loading}>
          {loading ? 'Suscribiendo...' : 'Suscribirse'}
        </Button>

        {/* Canal: nombre + avatar */}
        <div className="absolute bottom-1 left-1 flex flex-col items-start gap-1">
          <div>
            <Button onClick={handleChannelClick} variant="channel" className="pl-23">
              {news.Channel.ChannelName}
            </Button>
          </div>
          <Avatar onClick={handleChannelClick} className="w-25 h-25 -mt-25 border-4">
            <AvatarImage
              src={news.Channel.ChannelImageURL}
              alt={news.Channel.ChannelName}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="split">Categoria: {news.Categories}</Badge>
        <Badge variant="data">{news.PublicationDate}</Badge>
        <Badge variant="data">{news.CreatorFullName}</Badge>
      </div>

      <Badge variant="text" className="max-w-full break-words whitespace-normal">
        {news.ShortDescription}
      </Badge>

      <p className="text-gray-800 text-lg leading-relaxed">{news.Content}</p>

      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-white py-16 px-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Noticias Relacionadas
        </h2>
        <NewsByChannelAndCategory
          channelId={news.Channel.ChannelID}
          category={news.Categories}
        />
      </div>

      {/* Mostrar error si lo hay */}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default NewsDetailCard;

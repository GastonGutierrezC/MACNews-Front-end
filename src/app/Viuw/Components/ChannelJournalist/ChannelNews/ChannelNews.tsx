import { useNewsByChannel } from '@/app/Controller/Hooks/Channels/useNewsByChannel';
import { NewsCard } from '../../ShowNews/NewsCard';
import { Skeleton } from '@/components/ui/skeleton';

interface ChannelNewsProps {
  channelId: string;
}

function ChannelNews({ channelId }: ChannelNewsProps) {
  const { news, loading, error } = useNewsByChannel(channelId);

  if (loading) {
    return (
      <div className="flex flex-wrap gap-5">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-[250px] w-[300px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 font-semibold">
        Error al cargar noticias: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-5">
      {news.map((item) => (
        <NewsCard
          key={item.NewsId}
          newsImageUrl={item.NewsImageURL}
          channelImageUrl={item.Channel.ChannelImageURL}
          channelName={item.Channel.ChannelName}
          category={item.Categories}
          title={item.Title}
          publicationDate={item.PublicationDate}
          visitCount={item.VisitCount}
          NewsID={item.NewsId}
          ChannelID={item.Channel.ChannelID}
        />
      ))}
    </div>
  );
}

export default ChannelNews;

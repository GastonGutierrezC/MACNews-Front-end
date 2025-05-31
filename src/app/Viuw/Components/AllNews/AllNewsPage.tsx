'use client';

import Image from 'next/image';

import { useTopNews } from '@/app/Controller/Hooks/ShowNews/useTopNews';
import { NewsCard } from '../ShowNews/NewsCard';
import TopNews from '../ShowNews/TopNews';
import WordNews from '../../../Images/wordNews.png';
import { Button } from '@/components/ui/button';
import { useNews } from '@/app/Controller/Hooks/ShowNews/useNews';

export const AllNewsPage: React.FC = () => {
  const {
    news,
    loadingInitial,
    loadingMore,
    error,
    loadMore,
  } = useNews();

  const {
    news: topNews,
    loading: loadingTop,
    error: errorTop,
  } = useTopNews();

  return (
    <div className="min-h-screen p-6 flex flex-wrap gap-5 justify-start items-start pt-14">
      {/* Todas las noticias */}
      <div className="flex flex-col gap-5 pt-20">
        <h2 className="text-3xl font-bold mb-6">Ultimas Noticias</h2>

        {loadingInitial && <p className="text-gray-600">Cargando noticias...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loadingInitial && news.length === 0 && (
          <p className="text-gray-500">No se encontraron noticias.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-5">
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
              creatorFullName={item.CreatorFullName}
            />
          ))}
        </div>

        {news.length > 0 && (
          <div className="flex justify-center pt-10">
            <Button
              onClick={loadMore}
              disabled={loadingMore}
              variant="bluehover"
            >
              {loadingMore ? 'Cargando más...' : 'Ver más'}
            </Button>
          </div>
        )}
      </div>

      {/* Top Noticias */}
      {topNews.length > 0 && (
        <div className="flex flex-col gap-5 pt-20 pl-25">
          <h2 className="text-4xl font-bold text-center mb-8">Top 10 Noticias Más Populares</h2>

          {topNews.map((item) => (
            <TopNews
              key={item.NewsID}
              NewsID={item.NewsID}
              Title={item.Title}
              NewsImageURL={item.NewsImageURL}
              date={item.PublicationDate}
            />
          ))}

          <Image
            src={WordNews}
            alt="Logo"
            layout="responsive"
            width={180}
            height={180}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
};

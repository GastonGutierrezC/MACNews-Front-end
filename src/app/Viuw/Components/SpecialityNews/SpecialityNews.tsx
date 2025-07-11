'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useTopNews } from '@/app/Controller/Hooks/ShowNews/useTopNews';
import { NewsCard } from '../ShowNews/NewsCard';
import TopNews from '../ShowNews/TopNews';
import WordNews from '../../../Images/wordNews.png';
import { useNewsBySpeciality } from '@/app/Controller/Hooks/FilterNews/useNewsBySpeciality';
import { Button } from '@/components/ui/button';
import { SpecialtyConverter } from '@/app/Utils/GeneralConvertions/SpecialtyConverter';

interface SpecialityNewsProps {
    speciality: string;
}

export const SpecialityNews: React.FC<SpecialityNewsProps> = ({ speciality }) => {
  const {
    news,
    loadingInitial,
    loadingMore,
    error,
    loadMore,
  } = useNewsBySpeciality(speciality);

  const {
    news: topNews,
    loading: loadingTop,
    error: errorTop,
  } = useTopNews();

  useEffect(() => {
    // Esto asegura que la categoría se decodifique correctamente si viene de una URL
    decodeURIComponent(speciality);
  }, [speciality]);

  const specialitySpanish =  SpecialtyConverter.toSpanish(speciality);

  return (
    <div className="min-h-screen p-6 flex flex-wrap gap-5 justify-start items-start pt-14">
      {/* Noticias por categoría */}
      <div className="flex flex-col gap-5 pt-20">
        <h2 className="text-3xl font-bold mb-6">Noticias de la especialidad: {specialitySpanish}</h2>

        {loadingInitial && <p className="text-gray-600">Cargando noticias...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loadingInitial && news.length === 0 && (
          <p className="text-gray-500">No se encontraron noticias para esta categoría.</p>
        )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-20">

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

// app/Views/Components/ShowNews.tsx
'use client';

import React from 'react';
import { NewsCard } from './NewsCard';
import { SpecialNews } from './SpecialNews';
import TopNews from './TopNews';
import Image from 'next/image';
import WordNews from '../../../Images/wordNews.png';
import { Button } from '@/components/ui/button';
import { useShowNews } from '@/app/Controller/Hooks/ShowNews/useShowNews';
import TopChannelsList from './TopChannelsList';
import ListNews from './ListNews';

export const ShowNews: React.FC = () => {
  const {
    isAuthenticated,
    newsToShow,
    topNews,
    isLoading,
    recommendedNews,
    hasError,
    loadMore
  } = useShowNews();

  if (isLoading) return <p className="pt-16">Cargando noticias...</p>;
  if (hasError) return <p className="pt-16">Ocurrió un error al cargar noticias</p>;

  const showRecommended =
    isAuthenticated &&
    newsToShow === recommendedNews &&
    recommendedNews.length > 0;

  return (
    <div className="min-h-screen px-4 sm:px-8 lg:px-16 pt-10 flex flex-col gap-12">
      
      {/* === BLOQUE A === */}
      <div className="flex flex-col gap-8">
        
        {showRecommended && (
          <h2 className="text-5xl font-semibold text-center gothic-title">
            Tus noticias recomendadas
          </h2>
        )}

        {/* Noticia principal */}
        {newsToShow.length > 0 && (
          <div className="flex justify-center">
            <div className="w-full max-w-8xl">
              <SpecialNews
                imageUrl={newsToShow[0].NewsImageURL}
                category={newsToShow[0].Categories}
                title={newsToShow[0].Title}
                channelName={newsToShow[0].Channel.ChannelName}
                channelImageUrl={newsToShow[0].Channel.ChannelImageURL}
                publicationDate={newsToShow[0].PublicationDate}
                visitCount={newsToShow[0].VisitCount}
                NewsID={newsToShow[0].NewsId}
                creatorFullName={newsToShow[0].CreatorFullName}
              />
            </div>
          </div>
        )}

        
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {newsToShow.slice(1).map((item) => (
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

        {/* Botón Ver más noticias */}
        {!isAuthenticated && newsToShow.length > 0 && (
          <div className="flex justify-center">
            <Button variant="bluehover" onClick={loadMore}>
              Ver más noticias
            </Button>
          </div>
        )}
      </div>

      {/* === BLOQUE B === */}
      <div className="flex flex-col gap-6">
        {/* Canales más populares */}
        <TopChannelsList />

        {/* Noticias más populares */}
        {topNews.length > 0 && (
          <div className="flex flex-col gap-5">

{topNews.length > 0 && (
  <ListNews topNews={topNews} />
)}


          </div>
        )}
      </div>
    </div>
  );
};

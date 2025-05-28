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

export const ShowNews: React.FC = () => {
  const {
    user,
    newsToShow,
    topNews,
    isLoading,
    hasError,
    loadMore
  } = useShowNews();

  if (isLoading) return <p className="pt-65">Cargando noticias...</p>;
  if (hasError) return <p className="pt-65">Ocurrió un error al cargar noticias</p>;

  return (
    <div className="min-h-screen p-6 flex flex-wrap gap-5 justify-start items-start pt-64">
      {newsToShow.length > 0 && (
        <SpecialNews
          imageUrl={newsToShow[0].NewsImageURL}
          category={newsToShow[0].Categories}
          title={newsToShow[0].Title}
          channelName={newsToShow[0].Channel.ChannelName}
          channelImageUrl={newsToShow[0].Channel.ChannelImageURL}
          publicationDate={newsToShow[0].PublicationDate}
          visitCount={newsToShow[0].VisitCount}
          NewsID={newsToShow[0].NewsId}
        />
      )}

      <div className="flex flex-col gap-5">
        {newsToShow.slice(1, 4).map((item) => (
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

      <div className="flex flex-col gap-5 pt-20">
        {newsToShow.slice(4).map((item) => (
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

        {!user?.id && (
          <div className="flex justify-center pt-10">
            <Button variant="bluehover" onClick={loadMore}>Ver más noticias</Button>
          </div>
        )}
      </div>

      {topNews.length > 0 && (
        <div className="flex flex-col gap-5 pt-20 pl-15">
          <h2 className="text-4xl font-bold text-center mb-8">Top 10 Noticias Más Populares xd</h2>
          {topNews.map((item, index) => (
            <TopNews
              key={item.NewsID || index}
              NewsID={item.NewsID}
              Title={item.Title}
              NewsImageURL={item.NewsImageURL}
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

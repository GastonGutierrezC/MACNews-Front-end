'use client';

import React from 'react';
import { NewsCard } from './NewsCard';
import { useNews } from '@/app/Controller/Hooks/useNews';
import { SpecialNews } from './SpecialNews';
import { useTopNews } from '@/app/Controller/Hooks/useTopNews';
import TopNews from './TopNews';
import Image from 'next/image';
import WordNews from '../../../Images/wordNews.png';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useRecommendationsNews } from '@/app/Controller/Hooks/useRecommendationsNews';
import { Button } from '@/components/ui/button'; 

export const ShowNews: React.FC = () => {
  const { user } = useUser();

  const {
    news: defaultNews,
    loadingInitial,
    loadingMore,
    error,
    loadMore
  } = useNews();


  const {
    news: recommendedNews,
    loading: loadingRecommended,
    error: errorRecommended
  } = useRecommendationsNews(user?.id);
  
  const {
    news: topNews,
    loading: loadingTop,
    error: errorTop
  } = useTopNews();

  const newsToShow = user?.id && recommendedNews.length > 0
  ? recommendedNews
  : defaultNews;

  const isLoading = loadingInitial || loadingTop || (user?.id && loadingRecommended);
  const hasError = error || errorTop || (user?.id && errorRecommended);

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
          />
        ))}

        {!user?.id && (
          <div className="flex justify-center pt-10">
            <Button variant="bluehover"  onClick={loadMore}>Ver más noticias</Button>
          </div>
        )}

      </div>

      {topNews.length > 0 && (
  <div className="flex flex-col gap-5 pt-20 pl-25">
    <h2 className="text-4xl font-bold text-center mb-8">Top 10 Noticias Más Populares xd</h2>
    {topNews.map((item, index) => {
      console.log("ESTO "+item.NewsID);  
      return (
        <TopNews
          key={item.NewsID || index}
          NewsID={item.NewsID}
          Title={item.Title}
          NewsImageURL={item.NewsImageURL}
        />
      );
    })}
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

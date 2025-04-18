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


export const ShowNews: React.FC = () => {
  const { user } = useUser();

  const {
    news: defaultNews,
    loading: loadingDefault,
    error: errorDefault
  } = useNews();

  // Verificamos si user?.id existe antes de llamar al hook
  const {
    news: recommendedNews,
    loading: loadingRecommended,
    error: errorRecommended
  } = user?.id ? useRecommendationsNews(user.id) : {
    news: [],
    loading: false,
    error: null
  };

  const newsToShow = user?.id ? recommendedNews : defaultNews;

  const {
    news: topNews,
    loading: loadingTop,
    error: errorTop
  } = useTopNews();

  const isLoading = loadingDefault || loadingTop || (user?.id && loadingRecommended);
  const hasError = errorDefault || errorTop || (user?.id && errorRecommended);

  if (isLoading) return <p>Cargando noticias...</p>;
  if (hasError) return <p>Ocurrió un error al cargar noticias</p>;

  return (
    <div className="min-h-screen p-6 flex flex-wrap gap-5 justify-start items-start pt-64">
      {newsToShow.length > 0 && (
        <SpecialNews
          imageUrl="https://www.noticiasfides.com/images/news/2024/07/c-dolares-americanos-foto-internet_1721510875.jpg"
          category={newsToShow[0].Categories}
          title={newsToShow[0].Title}
          channelName={newsToShow[0].Channel.ChannelName}
          channelImageUrl="https://pxcdn.reduno.com.bo/reduno/122017/1544505888786.png"
          publicationDate={newsToShow[0].PublicationDate}
          visitCount={newsToShow[0].VisitCount}
        />
      )}

      <div className="flex flex-col gap-5">
        {newsToShow.slice(1, 4).map((item) => (
          <NewsCard
            key={item.NewsId}
            newsImageUrl="https://www.noticiasfides.com/images/news/2024/07/c-dolares-americanos-foto-internet_1721510875.jpg"
            channelImageUrl="https://pxcdn.reduno.com.bo/reduno/122017/1544505888786.png"
            channelName={item.Channel.ChannelName}
            category={item.Categories}
            title={item.Title}
            publicationDate={item.PublicationDate}
            visitCount={item.VisitCount}
          />
        ))}
      </div>

      <div className="flex flex-col gap-5 pt-20">
        {newsToShow.slice(4).map((item) => (
          <NewsCard
            key={item.NewsId}
            newsImageUrl="https://www.noticiasfides.com/images/news/2024/07/c-dolares-americanos-foto-internet_1721510875.jpg"
            channelImageUrl="https://pxcdn.reduno.com.bo/reduno/122017/1544505888786.png"
            channelName={item.Channel.ChannelName}
            category={item.Categories}
            title={item.Title}
            publicationDate={item.PublicationDate}
            visitCount={item.VisitCount}
          />
        ))}
      </div>

      {topNews.length > 0 && (
        <div className="flex flex-col gap-5 pt-20 pl-25">
          <h2 className="text-4xl font-bold text-center mb-8">Top 10 Noticias Más Populares</h2>
          {topNews.map((item, index) => (
            <TopNews
              key={item.NewsId || index}
              NewsID={item.NewsId}
              Title={item.Title}
              NewsImageURL="https://abi.bo/images/Noticias/Sociedad/sep-22/CMNSC.jpg"
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

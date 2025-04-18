'use client';

import React from 'react';
import { NewsCard } from './NewsCard';
import { useNews } from '@/app/Controller/Hooks/useNews';
import { SpecialNews } from './SpecialNews';
import { useTopNews } from '@/app/Controller/Hooks/useTopNews';
import TopNews from './TopNews';
import Image from 'next/image';
import WordNews from '../../../Images/wordNews.png';

export const ShowNews: React.FC = () => {
  const { news, loading, error } = useNews();
  const { news: topNews, loading: loadingTop, error: errorTop } = useTopNews();

  if (loading) return <p>Cargando noticias...</p>;
  if (error) return <p>Error: {error || errorTop}</p>;

  return (
    <div className="min-h-screen p-6 flex flex-wrap gap-5 justify-start items-start pt-64">

      {/* ⭐ Noticia especial */}
      {news.length > 0 && (
        <SpecialNews
          imageUrl="https://www.noticiasfides.com/images/news/2024/07/c-dolares-americanos-foto-internet_1721510875.jpg"
          category={news[0].Categories}
          title={news[0].Title}
          channelName={news[0].Channel.ChannelName}
          channelImageUrl="https://pxcdn.reduno.com.bo/reduno/122017/1544505888786.png"
          publicationDate={news[0].PublicationDate}
          visitCount={news[0].VisitCount}
        />
      )}

      {/* 📰 Siguientes 3 noticias */}
      <div className="flex flex-col gap-5">
        {news.slice(1, 4).map((item) => (
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

      {/* 📚 Resto de las noticias */}
      <div className="flex flex-col gap-5 pt-20">
        {news.slice(4).map((item) => (
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
          {/* Título de la sección */}
          <h2 className="text-4xl font-bold text-center mb-8">Top 10 Noticias Más Populares</h2>

          {/* Mapeo de las noticias */}
          {topNews.map((item, index) => (
            <TopNews
              key={item.NewsId || index}
              NewsID={item.NewsId}
              Title={item.Title}
              NewsImageURL="https://abi.bo/images/Noticias/Sociedad/sep-22/CMNSC.jpg"
            />
          ))}

          {/* Imagen debajo de las noticias */}
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

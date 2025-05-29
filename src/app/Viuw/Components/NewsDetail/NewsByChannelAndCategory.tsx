'use client';

import { useNewsByChannelAndCategory } from '@/app/Controller/Hooks/ShowNews/useNewsByChannelAndCategory';
import React, { useEffect, useRef } from 'react';
import { NewsCard } from '../ShowNews/NewsCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface NewsByChannelAndCategoryProps {
  channelId: string;
  category: string;
}

const NewsByChannelAndCategory: React.FC<NewsByChannelAndCategoryProps> = ({ channelId, category }) => {
  const { news, loading, error } = useNewsByChannelAndCategory(channelId, category);
  const nextButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextButtonRef.current?.click();
    }, 3000); // cada 3 segundos

    return () => clearInterval(interval); // limpieza
  }, []);

  if (loading) return <p className="pt-24">Cargando noticias filtradas...</p>;
  if (error) return <p className="pt-24 text-red-500">{error}</p>;

  return (
    <div className="relative w-full max-w-screen-xl mx-auto px-1">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="flex">
          {news.map((item, index) => (
            <CarouselItem
              key={item.NewsId}
              className="md:basis-1/2 lg:basis-1/3 mr-2"
            >
              <NewsCard
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
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext ref={nextButtonRef} />
      </Carousel>
    </div>
  );
};

export default NewsByChannelAndCategory;

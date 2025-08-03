'use client';

import React from 'react';
import { useHandleTopNewsClick } from '@/app/Controller/Hooks/ShowNews/useHandleTopNewsClick';
import { useShowNews } from '@/app/Controller/Hooks/ShowNews/useShowNews';
import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';

const NewsTicker: React.FC = () => {
  const { topNews } = useShowNews();
  const { handleTopNewsClick } = useHandleTopNewsClick();

  if (!topNews || topNews.length === 0) return null;

  return (
    <div className="w-full bg-[#B8D1E7] bg-[#063346] overflow-hidden relative">
      <div className="flex items-center gap-6 whitespace-nowrap animate-marquee hover:[animation-play-state:paused]  ">
        {topNews.map((news, index) => {
          const formattedDate = DateFormatter.formatDate(news.PublicationDate);
          return (
            <span
              key={news.NewsID || index}
              onClick={() => handleTopNewsClick(news.Title, formattedDate)}
              className="cursor-pointer text-sm sm:text-base md:text-lg font-semibold hover:text-[#063346] transition"
            >
              {news.Title}
            </span>
          );
        })}
      </div>

      {/* Gradientes laterales */}
      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#063346] to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#063346] to-transparent pointer-events-none" />
    </div>
  );
};

export default NewsTicker;

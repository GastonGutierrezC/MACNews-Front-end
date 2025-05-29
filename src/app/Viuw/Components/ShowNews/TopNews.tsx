'use client';

import React from 'react';
import { useHandleTopNewsClick } from '@/app/Controller/Hooks/ShowNews/useHandleTopNewsClick';

interface NewsTopProps {
  NewsID: string;
  Title: string;
  NewsImageURL: string;
  date: string;
}

const TopNews: React.FC<NewsTopProps> = ({ NewsID, Title, NewsImageURL,date }) => {
  const { handleTopNewsClick } = useHandleTopNewsClick();

  return (
    <div>
      <div
        key={NewsID}
        onClick={() => handleTopNewsClick(Title,date)}
        className="cursor-pointer relative  w-full h-30 sm:h-40 md:h-48 lg:h-30 xl:h-30 rounded-xl overflow-hidden shadow-lg group"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:brightness-75"
          style={{ backgroundImage: `url(${NewsImageURL})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <h3 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg">
            {Title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TopNews;

'use client';

import React from 'react';
import { useHandleTopNewsClick } from '@/app/Controller/Hooks/ShowNews/useHandleTopNewsClick';
import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';

interface NewsTopProps {
  NewsID: string;
  Title: string;
  NewsImageURL: string;
  date: string;
}

const TopNews: React.FC<NewsTopProps> = ({ NewsID, Title, NewsImageURL, date }) => {
  const { handleTopNewsClick } = useHandleTopNewsClick();
  const PublicationDate = DateFormatter.formatDate(date);

  return (
    <div
      onClick={() => handleTopNewsClick(Title, PublicationDate)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleTopNewsClick(Title, PublicationDate)}
      className="cursor-pointer flex items-center gap-4 w-full max-w-xl p-3 rounded-lg shadow-md bg-white hover:shadow-lg transition"
    >
      {/* Imagen cuadrada */}
      <div
        className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-200"
        style={{ backgroundImage: `url(${NewsImageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Texto */}
      <div className="flex flex-col justify-center flex-1">
        <h3 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-semibold leading-snug line-clamp-3">
          {Title}
        </h3>
        <span className="text-gray-500 text-sm mt-2">{PublicationDate}</span>
      </div>
    </div>
  );
};

export default TopNews;

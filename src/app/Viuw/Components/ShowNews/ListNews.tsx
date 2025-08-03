// app/Views/Components/ListNews.tsx
'use client';

import React from 'react';
import { useHandleTopNewsClick } from '@/app/Controller/Hooks/ShowNews/useHandleTopNewsClick';
import { DateFormatter } from '@/app/Utils/GeneralConvertions/DateFormatter';

interface NewsTopProps {
  NewsID: string;
  Title: string;
  NewsImageURL: string;
  PublicationDate: string; // usamos el formato real de tu backend
}

const ListNews: React.FC<{ topNews: NewsTopProps[] }> = ({ topNews }) => {
  const { handleTopNewsClick } = useHandleTopNewsClick();

  if (!topNews || topNews.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Título principal */}
      <h2 className="text-2xl sm:text-4xl font-black text-center mb-6 gothic-title">
        📰 Noticias más populares
      </h2>

      {/* Grid 2 en 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-items-center">
        {topNews.map((item) => {
          const formattedDate = DateFormatter.formatDate(item.PublicationDate);

          return (
            <div
              key={item.NewsID}
              onClick={() => handleTopNewsClick(item.Title, formattedDate)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleTopNewsClick(item.Title, formattedDate)
              }
              className="cursor-pointer flex items-center gap-4 w-full max-w-xl p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              {/* Imagen cuadrada */}
              <div
                className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-md overflow-hidden bg-gray-200"
                style={{
                  backgroundImage: `url(${item.NewsImageURL})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Texto */}
              <div className="flex flex-col justify-center flex-1">
                <h3 className="text-gray-900 text-lg sm:text-xl md:text-2xl font-semibold leading-snug line-clamp-3">
                  {item.Title}
                </h3>
                <span className="text-gray-500 text-sm mt-2">{formattedDate}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListNews;

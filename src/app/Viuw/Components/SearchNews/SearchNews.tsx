// src/app/Views/Search/SearchResults.tsx

'use client';

import { useEffect } from 'react';
import Image from 'next/image'; // Asegúrate de importar esto si no lo tenías
import { useSearchNews } from '@/app/Controller/Hooks/useSearchNews';
import { useTopNews } from '@/app/Controller/Hooks/useTopNews';
import { NewsCard } from '../ShowNews/NewsCard';
import TopNews from '../ShowNews/TopNews';
import WordNews from '../../../Images/wordNews.png';

interface SearchResultsProps {
  term: string;
}

export const SearchNews: React.FC<SearchResultsProps> = ({ term }) => {
  const {
    searchResults,
    loadingSearch,
    searchError,
    searchNews,
  } = useSearchNews();

  const {
    news: topNews,
    loading: loadingTop,
    error: errorTop,
  } = useTopNews();

  useEffect(() => {
    if (term) {
      searchNews(decodeURIComponent(term));
    }
  }, [term]);

  return (
    <div className="min-h-screen p-6 flex flex-wrap gap-5 justify-start items-start pt-64">
      
      {/* Bloque de resultados de búsqueda */}
      <div className="flex flex-col gap-5 pt-20">


        {loadingSearch && <p className="text-gray-600">Cargando noticias...</p>}
        {searchError && <p className="text-red-600">Error: {searchError}</p>}

        {searchResults.length === 0 && !loadingSearch && (
          <p className="text-gray-500">No se encontraron noticias.</p>
        )}

        {searchResults.map((news) => (
          <NewsCard
            key={news.NewsId}
            newsImageUrl={news.NewsImageURL}
            channelImageUrl={news.Channel.ChannelImageURL}
            channelName={news.Channel.ChannelName}
            category={news.Categories}
            title={news.Title}
            publicationDate={news.PublicationDate}
            visitCount={news.VisitCount}
            NewsID={news.NewsId}
          />
        ))}
      </div>

      {/* Bloque de Top Noticias */}
      {topNews.length > 0 && (
  <div className="flex flex-col gap-5 pt-20 pl-25">
    <h2 className="text-4xl font-bold text-center mb-8">Top 10 Noticias Más Populares xd</h2>


          {topNews.map((item) => (
            <TopNews
              key={item.NewsID}
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

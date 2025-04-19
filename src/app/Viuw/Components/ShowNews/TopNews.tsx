'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface NewsTopProps {
  NewsID: string;
  Title: string;
  NewsImageURL: string;
}

const TopNews: React.FC<NewsTopProps> = ({ NewsID, Title, NewsImageURL }) => {
  const router = useRouter();

  const handleClick = () => {
   
    localStorage.setItem('selectedNewsId', NewsID);
  
    
    const savedId = localStorage.getItem('selectedNewsId');
    console.log('ID guardado en localStorage:', savedId);
  
    
    setTimeout(() => {
      router.push('/pages/news'); 
    }, 100); 
  };
  

  return (
    <div>
      <div
        key={NewsID}
        onClick={handleClick}
        className="cursor-pointer relative w-150 h-32 rounded-xl overflow-hidden shadow-lg group"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:brightness-75"
          style={{ backgroundImage: `url(${NewsImageURL})` }}
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <h3 className="text-white text-3xl font-bold drop-shadow-lg">
            {Title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default TopNews;

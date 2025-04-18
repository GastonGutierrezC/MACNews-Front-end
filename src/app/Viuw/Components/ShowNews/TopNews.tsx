import React from 'react';

interface NewsTopProps {
  NewsID: string;
  Title: string;
  NewsImageURL: string;
}

const TopNews: React.FC<NewsTopProps> = ({ NewsID, Title, NewsImageURL }) => {
  return (
    
    <div>
      {/* Título de la sección */}

      <div
        key={NewsID}
        className="relative w-150 h-32 rounded-xl overflow-hidden shadow-lg group"
      >
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:brightness-75"
          style={{ backgroundImage: `url(${NewsImageURL})` }}
        />

        {/* Título centrado */}
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

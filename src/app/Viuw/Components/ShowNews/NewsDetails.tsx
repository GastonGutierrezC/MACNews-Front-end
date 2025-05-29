import React from 'react';

interface NewsDetailsProps {
  category: string;
  title: string;
  publicationDate: string;
  visitCount: number;
  ChannelID: string;
}

export const NewsDetails: React.FC<NewsDetailsProps> = ({
  category,
  title,
  publicationDate,
  visitCount,
  ChannelID,
}) => {
  return (
    <div className="w-full p-2 flex flex-col text-left">
      {/* Título */}
      <h2 className="text-md font-semibold line-clamp-2 leading-snug break-words mb-1">
        {title}
      </h2>

      {/* Categoría (opcional, como badge pequeño o texto gris) */}
      <span className="text-sm text-gray-600 ">Categoría: {category}</span>

      {/* Fecha + visitas en una línea */}
      <span className="text-sm text-gray-600">
        {visitCount.toLocaleString()} vistas • {publicationDate}
      </span>
    </div>
  );
};

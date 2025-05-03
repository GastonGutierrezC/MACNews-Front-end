import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface NewsDetailsProps {
  category: string;
  title: string;
  publicationDate: string;
  visitCount: number;
}

export const NewsDetails: React.FC<NewsDetailsProps> = ({ category, title, publicationDate, visitCount }) => {
  return (
    <div className="w-94 h-60 bg-[#B8D1E7] rounded-xl shadow-md p-4 flex flex-col justify-between">
      <div className="text-center">
        <div className="flex justify-center items-center gap-1">
          <Badge variant="split">Categoria: {category}</Badge>
        <Button variant="bluehover">
          Suscribirse
        </Button>
        </div>
        <h2 className="text-3xl font-semibold mt-7 line-clamp-2 leading-snug break-words">
          {title}
        </h2>
      </div>
      <div className="flex gap-4 mt-2 justify-center">
        <Badge variant="data">
          {publicationDate}
        </Badge>
        <Badge variant="data">
          {visitCount} vistas
        </Badge>
      </div>
    </div>
  );
};

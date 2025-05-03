// app/Views/Components/NewsCard.tsx

import React from 'react';
import { NewsImage } from './NewsImage';
import { NewsDetails } from './NewsDetails';

interface NewsCardProps {
  newsImageUrl: string;
  channelImageUrl: string;
  channelName: string;
  category: string;
  title: string;
  publicationDate: string;
  visitCount: number;
  NewsID: string;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  newsImageUrl,
  channelImageUrl,
  channelName,
  category,
  title,
  publicationDate,
  visitCount,
  NewsID,
}) => {
  return (
    <div className="flex items-center border rounded-xl shadow-md min-w-[550px] bg-white">
        
      <NewsImage
        newsImageUrl={newsImageUrl}
        channelImageUrl={channelImageUrl}
        channelName={channelName}
        NewsID={NewsID}
      />
      <NewsDetails
        category={category}
        title={title}
        publicationDate={publicationDate}
        visitCount={visitCount}
      />
    </div>
  );
};

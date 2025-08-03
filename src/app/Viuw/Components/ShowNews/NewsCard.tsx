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
  ChannelID: string;
  creatorFullName: string;
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
  ChannelID,
  creatorFullName
}) => {
  return (
    <div className="flex flex-col w-[440px] h-[360px] rounded-xl overflow-hidden shadow-xl bg-white">
      <div className="flex-1">
        <NewsImage
          newsImageUrl={newsImageUrl}
          channelImageUrl={channelImageUrl}
          channelName={channelName}
          title={title}
          publicationDate={publicationDate}
          NewsID={NewsID}
          creatorFullName= {creatorFullName}
        />
      </div>
      <div className="flex-1">
        <NewsDetails
          category={category}
          title={title}
          publicationDate={publicationDate}
          visitCount={visitCount}
          ChannelID={ChannelID}
          channelName={channelName}
          channelImageUrl={channelImageUrl}
          creatorFullName={creatorFullName}
          
        />
      </div>
    </div>
  );
};

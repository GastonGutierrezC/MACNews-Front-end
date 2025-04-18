import React from 'react';

interface NewsImageProps {
  newsImageUrl: string;
  channelImageUrl: string;
  channelName: string;
}

export const NewsImage: React.FC<NewsImageProps> = ({ newsImageUrl, channelImageUrl, channelName }) => {
    return (
      <div className="relative w-94 h-60 rounded-xl overflow-hidden shadow-md group">
        <img
          src={newsImageUrl}
          alt="News"
          className="w-full h-full object-cover transition duration-300 group-hover:brightness-75"
        />
       
        <div className="absolute bottom-1 left-1 flex flex-col items-start gap-1">
          <div
            className="bg-[#AEE1F4] text-[#0A4B7B] px-1 py-1 rounded-full pl-20"
            style={{ border: '6px solid #0A4B7B' }}
          >
            <span className="text-[20px] font-bold font-[League Spartan], sans-serif">
              {channelName}
            </span>
          </div>
          <img
            src={channelImageUrl}
            alt="Channel"
            className="w-20 h-20 rounded-full -mt-21"
          />
        </div>
      </div>
    );
  };
  
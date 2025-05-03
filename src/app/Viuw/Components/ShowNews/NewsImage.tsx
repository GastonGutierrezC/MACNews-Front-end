import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react';
import { useRouter } from 'next/navigation';

interface NewsImageProps {
  newsImageUrl: string;
  channelImageUrl: string;
  channelName: string;
  NewsID: string;
}

export const NewsImage: React.FC<NewsImageProps> = ({ newsImageUrl, channelImageUrl, channelName,NewsID }) => {
    
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
      <div className="relative w-94 h-60 rounded-xl overflow-hidden shadow-md group">

        <Button
          variant="imagebg"
          key={NewsID}
          onClick={handleClick}
          style={{ backgroundImage: `url(${newsImageUrl})` }}
          >
        </Button>
        <div className="absolute bottom-1 left-1 flex flex-col items-start gap-1">
        <div>
        <Button variant="channel" className="pl-18">
        {channelName}
       </Button>
        </div>
        <Avatar className="w-20 h-20 -mt-20 border-3 ">
          <AvatarImage src={channelImageUrl} alt={channelName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      </div>
    );
  };
  
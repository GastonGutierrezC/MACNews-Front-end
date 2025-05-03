'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useRouter } from 'next/navigation';

interface SpecialNewsProps {
  imageUrl: string;
  category: string;
  title: string;
  channelName: string;
  channelImageUrl: string;
  publicationDate: string;
  visitCount: number;
  NewsID: string;
}

export const SpecialNews: React.FC<SpecialNewsProps> = ({
  imageUrl,
  category,
  title,
  channelName,
  channelImageUrl,
  publicationDate,
  visitCount,
  NewsID,
  
  
}) => {

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
    <Card className="relative w-[880px] h-[760px] rounded-xl overflow-hidden shadow-lg group">
 
      <Button
        variant="imagebg"
        key={NewsID}
        onClick={handleClick}
        style={{ backgroundImage: `url(${imageUrl})` }}
       >
        {title}
      </Button>

      <div className="absolute top-4 left-4 flex">
      <Badge variant="split">Categoria: {category}</Badge>
      </div>


      <div className="absolute bottom-5 left-5 flex flex-col items-start gap-1">
        <div>
        <Button variant="channel" className="pl-23">
        {channelName}
       </Button>

        </div>
        <Avatar className="w-25 h-25 -mt-25 border-4 ">
          <AvatarImage src={channelImageUrl} alt={channelName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute bottom-6 right-6 flex flex-row items-center gap-4 text-right">
        <Badge variant="data">
          {publicationDate}
        </Badge>
        <Badge variant="data">
          {visitCount} vistas
        </Badge>
        <Button variant="bluehover">
          Suscribirse
        </Button>
      </div>
    </Card>
  );
};

'use client';

import { NewsDetail } from '@/app/Model/Entities/NewsDetail';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface Props {
  news: NewsDetail;
}

const NewsDetailCard = ({ news }: Props) => {
  return (
    <div className="pt-64 max-w-6xl mx-auto p-4 bg-white rounded-xl shadow-md space-y-6">
 
   <div className="flex justify-center">
   <Badge variant="title">{news.Title}</Badge>
   </div>
<div className="relative">

  <img
    src={news.NewsImageURL}
    alt="Imagen de la noticia"
    className="w-full h-140 object-cover rounded-lg"
  />


  <Button variant="bluehover2">
    Suscribirse
  </Button>


  <div className="absolute bottom-1 left-1 flex flex-col items-start gap-1">

    <div>
        <Button variant="channel" className="pl-23">
        {news.Channel.ChannelName}
       </Button>

        </div>
        <Avatar className="w-25 h-25 -mt-25 border-4 ">
          <AvatarImage src={news.Channel.ChannelImageURL} alt={news.Channel.ChannelName} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
  </div>
</div>

<div className="flex items-center">

  <Badge variant="split">Categoria: {news.Categories}</Badge>
  <Badge variant="data"> {news.PublicationDate}</Badge>
</div>
<Badge variant="title">{news.ShortDescription}</Badge>
    <p className="text-gray-800 text-lg leading-relaxed">{news.Content}</p>
    </div>

  );
};

export default NewsDetailCard;

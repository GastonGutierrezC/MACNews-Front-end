'use client';

import { NewsDetail } from '@/app/Model/Entities/NewsDetail';
import Image from 'next/image';

interface Props {
  news: NewsDetail;
}

const NewsDetailCard = ({ news }: Props) => {
  return (
    <div className="pt-64 max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-md space-y-6">
 
      <h1 className="text-3xl font-bold text-gray-900  text-center">{news.Title}</h1>


<div className="relative">

  <img
    src={news.NewsImageURL}
    alt="Imagen de la noticia"
    className="w-full h-130 object-cover rounded-lg"
  />


  <button
    className="absolute bottom-4 right-4 bg-[#B8D1E7] text-[#2271B3] border-[#063346] border-4 px-6 py-1 rounded-md text-xl font-extrabold transition hover:bg-[#2271B3] hover:text-[#B8D1E7]"
  >
    Suscribirse
  </button>


  <div className="absolute bottom-1 left-1 flex flex-col items-start gap-1">
    <div
      className="bg-[#AEE1F4] text-[#0A4B7B] px-1 py-1 rounded-full pl-20"
      style={{ border: '6px solid #0A4B7B' }}
    >
      <span className="text-[20px] font-bold font-[League Spartan], sans-serif">
        {news.Channel.ChannelName}
      </span>
    </div>
    <img
      src={news.Channel.ChannelImageURL}
      alt="Channel"
      className="w-20 h-20 rounded-full -mt-21"
    />
  </div>
</div>


   


<div className="flex items-center">
  <span className="text-white bg-[#0A79B0] px-2 py-2 rounded-l-full text-ls font-medium">
    Categoria:
  </span>
  <span className="bg-[#AEE1F4] text-black px-2 py-2 rounded-r-full text-ls font-medium">
    {news.Categories}
  </span>
  
  <span className="ml-4 text-gray-600">
    {new Date(news.PublicationDate).toLocaleDateString('es-AR')}
  </span>
</div>


      {/* Contenido */}
      <p className="text-gray-800 text-lg leading-relaxed">{news.Content}</p>
    </div>


  );
};

export default NewsDetailCard;

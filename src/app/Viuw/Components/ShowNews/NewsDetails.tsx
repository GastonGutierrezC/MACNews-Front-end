import React from 'react';

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
        {/* Categoría + botón Suscribirse */}
        <div className="flex justify-center items-center gap-9">
          <div className="flex">
            <span className="text-white bg-[#0A79B0] px-2 py-2 rounded-l-full text-ls font-medium">
              Categoria:
            </span>
            <span className="bg-[#AEE1F4] text-black px-2 py-2 rounded-r-full text-ls font-medium">
              {category}
            </span>
          </div>
          <button
            className="bg-[#B8D1E7] text-[#2271B3] border-[#063346] border-4 px-6 py-1 rounded-md text-xl font-extrabold transition hover:bg-[#2271B3] hover:text-[#B8D1E7]"
          >
            Suscribirse
          </button>

        </div>

        {/* Título centrado y más grande */}
        <h2 className="text-3xl font-semibold mt-7 line-clamp-2 leading-snug break-words">
          {title}
        </h2>
      </div>

      <div className="flex gap-4 mt-2 justify-center">
        {/* Estilo para la fecha */}
        <div className="bg-[#AEE1F4] text-black px-4 py-1 rounded-full">
          {publicationDate}
        </div>
        {/* Estilo para las vistas */}
        <div className="bg-[#AEE1F4] text-black px-4 py-1 rounded-full">
          {visitCount} vistas
        </div>
      </div>
    </div>
  );
};

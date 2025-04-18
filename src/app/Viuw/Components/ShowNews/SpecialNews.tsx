import React from 'react';

interface SpecialNewsProps {
  imageUrl: string;
  category: string;
  title: string;
  channelName: string;
  channelImageUrl: string;
  publicationDate: string;
  visitCount: number;
}



export const SpecialNews: React.FC<SpecialNewsProps> = ({
  imageUrl,
  category,
  title,
  channelName,
  channelImageUrl,
  publicationDate,
  visitCount,
}) => {
  return (
<div className="relative w-219 h-190 rounded-xl overflow-hidden shadow-lg group">
  {/* Fondo de la imagen con efecto de oscurecimiento al hacer hover */}
  <div
    className="absolute inset-0 bg-cover bg-center transition duration-300 group-hover:brightness-75"
    style={{ backgroundImage: `url(${imageUrl})` }}
  />
      {/* Categoría en esquina superior derecha */}
      <div className="px-5 py-5 absolute flex ">
            <span className="text-white bg-[#0A79B0] px-2 py-2 rounded-l-full text-ls font-medium">
              Categoria:
            </span>
            <span className="bg-[#AEE1F4] text-black px-2 py-2 rounded-r-full text-ls font-medium">
              {category}
            </span>
          </div>

      {/* Título en el centro */}
      <div className="absolute inset-0 flex items-center justify-center px-4 text-center translate-y-50">
      <h2 className="text-white text-4xl font-bold drop-shadow-lg">{title}</h2>
      </div>


      {/* Información en esquina inferior izquierda */}
      <div className="absolute bottom-5 left-5 flex flex-col items-start gap-1">
        {/* Fondo del nombre del canal con color y borde personalizado */}
        <div
          className="bg-[#AEE1F4] text-[#0A4B7B] px-1 py-1 rounded-full pl-23"
          style={{ border: '6px solid #0A4B7B' }} // Puedes ajustar el grosor cambiando el valor de 2px
        >
          <span className="text-[25px] font-bold font-[League Spartan], sans-serif">
            {channelName}
          </span> {/* Nombre del canal con texto en negrita y fuente League Spartan */}
        </div>
        {/* Imagen del canal sobre el nombre del canal */}        {/* Imagen del canal sobre el nombre del canal */}
        <img
          src={channelImageUrl}
          alt="Channel"
          className="w-25 h-25 rounded-full -mt-25" /* La clase -mt-8 mueve la imagen más hacia arriba */
        />
      </div>

      <div className="absolute bottom-7 right-6 flex flex-row items-center gap-12 text-right">
      <div className="bg-[#AEE1F4] text-black px-3 py-1 rounded-full text-xl">
          {publicationDate}
        </div>
        <div className="bg-[#AEE1F4] text-black px-3 py-1 rounded-full text-xl">
          {visitCount} vistas
        </div>
        <button
          className="bg-[#B8D1E7] text-[#2271B3] border-[#063346] border-4 px-4 py-1.5 rounded-md text-xl font-semibold hover:bg-[#2271B3] hover:text-[#B8D1E7] transition"
        >
          Suscribirse
        </button>
      </div>
    </div>
  );
};

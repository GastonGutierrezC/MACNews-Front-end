import React from 'react';

const FooterAboutUs = () => {
  const texto = `"Nuestra plataforma permite a los periodistas compartir noticias de calidad y en brindar informacion personalizada a los lectores. Creemos en la transparencia, la veracidad y el acceso libre a la información para todos."`;

  const lineas = texto.split(' ').reduce((acc, palabra, index) => {
    const lineaIndex = Math.floor(index / 10);
    if (!acc[lineaIndex]) acc[lineaIndex] = [];
    acc[lineaIndex].push(palabra);
    return acc;
  }, [] as string[][]);

  return (
    <div className="text-white text-sm space-y-1 max-w-xs">
      <h3 className="font-bold mb-1" style={{ color: '#B8D1E7' }}>
        Sobre Nosotros
      </h3>
      {lineas.map((linea, idx) => (
        <p key={idx}>{linea.join(' ')}</p>
      ))}
    </div>
  );
};

export default FooterAboutUs;

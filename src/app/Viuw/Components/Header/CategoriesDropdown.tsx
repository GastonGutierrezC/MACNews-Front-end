// src/app/Viuw/Components/CategoriesDropdown.tsx

'use client'; // Agrega esta línea

import React, { useState } from 'react';

const categorias = ["Política", "Medicina", "Economía"];

const CategoriesDropdown = () => {
  const [abierto, setAbierto] = useState(false);

  const handleCategoriaClick = (categoria: string) => {
    console.log("Categoría seleccionada:", categoria);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setAbierto(!abierto)}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Categorías
      </button>

      {abierto && (
        <ul className="absolute mt-2 bg-white border rounded shadow-md w-40 z-10">
          {categorias.map((categoria) => (
            <li
              key={categoria}
              onClick={() => handleCategoriaClick(categoria)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {categoria}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriesDropdown;

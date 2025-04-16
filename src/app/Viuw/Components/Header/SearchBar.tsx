
'use client'; // Agrega esta línea

import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';

const SearchBar = ({ className }: { className?: string }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    console.log('Texto buscado:', searchQuery);
  };

  return (
    <div className={`flex items-center border border-black rounded-full px-4 py-2 w-full bg-white ${className}`}>
      <input
        type="text"
        placeholder="Buscar..."
        className="bg-white outline-none text-black text-2xl w-full placeholder-black"
        value={searchQuery}
        onChange={handleChange}
      />
      <MdSearch
        className="text-black text-5xl cursor-pointer"
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default SearchBar;
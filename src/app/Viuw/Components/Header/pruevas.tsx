import React from 'react';



const SearchBar = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center border rounded-md px-4 py-2 w-full max-w-xl bg-transparent ${className}`}>
      <input
        type="text"
        placeholder="Buscar..."
        className="bg-transparent outline-none text-black w-full placeholder-black"
      />
    </div>
  );
};

export default SearchBar;


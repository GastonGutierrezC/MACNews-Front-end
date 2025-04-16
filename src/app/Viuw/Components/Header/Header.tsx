import React from 'react';
import CategoriesDropdown from './CategoriesDropdown';
import FormIcon from './FormIcon';
import LoginIcon from './LoginIcon';
import LogoIcon from './LogoIcon';
import SearchBar from './SearchBar';

const Header = () => {
    return (
      <header 

  className="fixed top-0 left-0 w-full z-50 flex flex-col px-6 py-4"
  style={{ backgroundColor: '#063346' }}      
      >
        {/* Contenedor con margen horizontal de 100px a ambos lados */}
        <div className="w-full mx-auto px-6 sm:px-[100px]">
          {/* Sección superior con los componentes alineados */}
          <div className="flex items-center justify-between w-full flex-wrap sm:flex-nowrap">
            {/* Izquierda: Logo + SearchBar */}
            <div className="flex items-center gap-7 sm:gap-14 w-full sm:w-auto justify-between">
              <LogoIcon />

            </div>
            <div className="flex-grow mx-8 w-full max-w-full"> {/* Margen a los lados de la barra de búsqueda */}                <SearchBar />
              </div>
  
            {/* Contenedor para los íconos, se mueve al fondo derecho */}
            <div className="flex items-center gap-10 ml-auto">
              <FormIcon />
              <LoginIcon />
            </div>
          </div>
  
          {/* Sección inferior: Categorías centrado sin margen lateral */}
          <div className=" w-full flex justify-center">
            <CategoriesDropdown />
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  
  
  
  

  
'use client';

import React from 'react';
import CategoriesDropdown from './CategoriesDropdown';
import FormIcon from './FormIcon';
import LogoIcon from './LogoIcon';
import SearchBar from './SearchBar';
import UserIcon from './UserIcon'; 
import SpecialtyDropdown from './SpecialtyDropdown';
import LastNewsRedirectButton from './Last-news';
import { UserChannelsSheet } from '../ShowFollowChannels/UserChannelsSheet';
import NewsTicker from './NewsTicker';

const Header = () => {
  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 flex flex-col"
        style={{ backgroundColor: '#063346' }}
      >
        {/* Top bar: Logo + Buscador + Iconos */}
        <div className="w-full mx-auto px-4 sm:px-[100px] py-3">
          <div className="flex items-center justify-between w-full">
            
            {/* Logo */}
            <div className="flex items-center gap-6 sm:gap-14">
              <LogoIcon />
            </div>

            {/* Buscador + Iconos (solo en desktop) */}
            <div className="hidden lg:flex items-center gap-6 ml-auto">
              <div className="w-[180px] sm:w-[220px] md:w-[300px]">
                <SearchBar />
              </div>
              <FormIcon />
              <UserIcon />
            </div>
          </div>
        </div>

        <NewsTicker />

        {/* Barra de navegación secundaria */}
        
        {/* Escritorio */}
<div className="hidden sm:flex relative items-center bg-white py-2 shadow-md px-6">
  {/* UserChannelsSheet a la izquierda */}
  <div className="flex items-center">
    <UserChannelsSheet />
  </div>

  {/* Botones centrados */}
  <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 items-center">
    <LastNewsRedirectButton />
    <SpecialtyDropdown />
    <CategoriesDropdown />
  </div>
</div>



        {/* Móvil */}
        <div className="flex flex-col items-center gap-3 sm:hidden w-full bg-white py-3 shadow-md">
          <div className="flex justify-center gap-4 w-full px-4">
            <SpecialtyDropdown />
            <CategoriesDropdown />
          </div>

          <div className="flex justify-center gap-6 w-full px-4">
            <UserChannelsSheet />
            <LastNewsRedirectButton />
          </div>
        </div>
      </header>

      {/* Espaciado dinámico según el alto del header */}
      <div className="pt-[130px] sm:pt-[160px]" />
    </>
  );
};

export default Header;

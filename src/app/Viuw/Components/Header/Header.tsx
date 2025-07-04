'use client';

import React from 'react';
import CategoriesDropdown from './CategoriesDropdown';
import FormIcon from './FormIcon';
import LogoIcon from './LogoIcon';
import SearchBar from './SearchBar';
import UserIcon from './UserIcon'; 
import SpecialtyDropdown from './SpecialtyDropdown';
import { Button } from '@/components/ui/button';
import LastNewsRedirectButton from './Last-news';
import { UserChannelsSheet } from '../ShowFollowChannels/UserChannelsSheet';

const Header = () => {
  return (
    <>
      <header
        className="fixed top-0 left-0 w-full z-50 flex flex-col px-0 py-4"
        style={{ backgroundColor: '#063346' }}
      >
        <div className="w-full mx-auto px-6 sm:px-[100px]">
          <div className="flex flex-nowrap items-center justify-between w-full">
            <div className="flex items-center gap-7 sm:gap-14">
              <LogoIcon />
            </div>

            <div className="flex-grow w-full order-1  flex flex-col items-center">
              <div className="w-full max-w-[600px]">
                <SearchBar />
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-10 ml-auto order-2">
              <FormIcon />
              <UserIcon />
            </div>
          </div>
        </div>
      </header>

      <div className="fixed top-[80px] sm:top-[125px] left-0 w-full z-40 bg-white py-2 shadow">
  {/* Versión para pantallas grandes */}
  <div className="relative hidden sm:flex justify-center items-center">
    {/* Botón a la izquierda */}
    <div className="absolute left-4">
  <UserChannelsSheet />
    </div>

    {/* Botones centrados */}
    <div className="flex gap-4">
      <LastNewsRedirectButton />
      <SpecialtyDropdown />
      <CategoriesDropdown />
    </div>
  </div>

  {/* Versión para pantallas pequeñas */}
  <div className="flex flex-col items-center gap-3 sm:hidden">
    {/* Botones centrados */}
    <div className="flex gap-4">
      
      <SpecialtyDropdown />
      <CategoriesDropdown />
    </div>

    <div className="flex gap-8">
  <UserChannelsSheet />
    <LastNewsRedirectButton />
    
    </div>

    {/* Botón debajo */}

  </div>
</div>



      <div className="pt-[90px]" />
    </>
  );
};

export default Header;

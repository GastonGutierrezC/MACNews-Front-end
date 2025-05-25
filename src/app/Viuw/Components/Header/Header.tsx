'use client';


import React from 'react';
import CategoriesDropdown from './CategoriesDropdown';
import FormIcon from './FormIcon';
import LogoIcon from './LogoIcon';
import SearchBar from './SearchBar';
import UserIcon from './UserIcon'; 
import SpecialtyDropdown from './SpecialtyDropdown';
import { UserChannelsSheet } from '../ShowFollowChannels/UserChannelsSheet';

const Header = () => {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 flex flex-col px-6 py-4 mb-30"
      style={{ backgroundColor: '#063346' }}
    >
      <div className="w-full mx-auto px-6 sm:px-[100px]">
        <div className="flex items-center justify-between w-full flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-7 sm:gap-14 w-full sm:w-auto justify-between">
            <LogoIcon />
            <SpecialtyDropdown />
            <CategoriesDropdown />
          </div>

          <div className="flex-grow mx-8 w-full max-w-full">
            <SearchBar />
          </div>

          <div className="flex items-center gap-10 ml-auto">
            <FormIcon />
            
            <UserIcon />
          </div>
        </div>
        
      </div>
    </header>
    
  );
};

export default Header;


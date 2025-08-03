'use client';

import React from 'react';
import Image from 'next/image';
import Logo from '../../../Images/logo2.png';
import { useLogoRedirect } from '@/app/Controller/Hooks/ShowNews/useLogoRedirect';


const LogoIcon = () => {
  const { redirectToHome } = useLogoRedirect();

  return (
    <div
      className="w-27 sm:w-32 md:w-20 lg:w-38 xl:w-45 cursor-pointer"
      onClick={redirectToHome}
    >
      <Image
        src={Logo}
        alt="Logo"
        layout="responsive"
        width={70}
        height={70}
        className="object-contain"
      />
    </div>
  );
};

export default LogoIcon;

'use client';

import React from 'react';
import Image from 'next/image';
import Logo from '../../../Images/logo.png';
import { useLogoRedirect } from '@/app/Controller/Hooks/ShowNews/useLogoRedirect';


const LogoIcon = () => {
  const { redirectToHome } = useLogoRedirect();

  return (
    <div
      className="w-14 sm:w-22 md:w-20 lg:w-28 xl:w-35 cursor-pointer"
      onClick={redirectToHome}
    >
      <Image
        src={Logo}
        alt="Logo"
        layout="responsive"
        width={180}
        height={180}
        className="object-contain"
      />
    </div>
  );
};

export default LogoIcon;

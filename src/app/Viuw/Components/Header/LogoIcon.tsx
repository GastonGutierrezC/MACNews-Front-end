'use client';

import React from 'react';
import Image from 'next/image';
import Logo from '../../../Images/logo.png';
import { useLogoRedirect } from '@/app/Controller/Hooks/ShowNews/useLogoRedirect';


const LogoIcon = () => {
  const { redirectToHome } = useLogoRedirect();

  return (
    <div
      className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-52 cursor-pointer"
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

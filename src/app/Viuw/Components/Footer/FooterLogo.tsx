import React from 'react';
import Logo from '../../../Images/logo.png';
import Image from 'next/image';

const FooterLogo = () => {
  return (
    <div className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-52">
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

export default FooterLogo;

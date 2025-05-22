'use client';

import React from 'react';
import { MdAssignmentInd } from 'react-icons/md';
import { useRouter } from 'next/navigation';
const FormIcon = () => {

  
  const iconClassName = 'text-5xl sm:text-6xl md:text-7xl cursor-pointer text-white'; 

  const router = useRouter();

  const handleClick = () => {
    router.push('/pages/journalistForm');
  };

  return (
    <MdAssignmentInd
      className={iconClassName}
      title="Formulario"
      onClick={handleClick}
    />
  );
};

export default FormIcon;

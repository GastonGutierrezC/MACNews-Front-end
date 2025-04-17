'use client';

import React from 'react';
import { MdAssignmentInd } from 'react-icons/md';
import { useUser } from '@/app/Controller/Context/UserContext'; 

const FormIcon = () => {
  const { user } = useUser(); 

  
  const iconClassName = user
    ? 'text-7xl sm:text-8xl md:text-9xl cursor-pointer text-white' 
    : 'text-5xl sm:text-6xl md:text-7xl cursor-pointer text-white'; 

  return (
    <MdAssignmentInd
      className={iconClassName}
      title="Formulario"
    />
  );
};

export default FormIcon;

'use client';

import React from 'react';
import { MdAssignmentInd } from 'react-icons/md';

const FormIcon = () => {

  
  const iconClassName = 'text-5xl sm:text-6xl md:text-7xl cursor-pointer text-white'; 

  return (
    <MdAssignmentInd
      className={iconClassName}
      title="Formulario"
    />
  );
};

export default FormIcon;

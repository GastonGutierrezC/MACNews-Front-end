'use client';

import React from 'react';
import { MdAssignmentInd } from 'react-icons/md';
import { GiNewspaper } from 'react-icons/gi';
import { useJournalistRedirect } from '@/app/Controller/Hooks/JournalistForm/useJournalistRedirect';


const FormIcon = () => {
  const { handleRedirect, isJournalist } = useJournalistRedirect();

  const iconClassName = 'text-5xl sm:text-6xl md:text-7xl cursor-pointer text-white';

  return isJournalist ? (
    <GiNewspaper
      className={iconClassName}
      title="Micrófono"
      onClick={handleRedirect}
      role="button"
      tabIndex={0}
    />
  ) : (
    <MdAssignmentInd
      className={iconClassName}
      title="Formulario"
      onClick={handleRedirect}
      role="button"
      tabIndex={0}
    />
  );
};

export default FormIcon;

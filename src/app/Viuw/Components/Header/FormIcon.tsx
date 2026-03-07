'use client';

import React from 'react';
import { MdAssignmentInd } from 'react-icons/md';
import { GiNewspaper } from 'react-icons/gi';
import { AiOutlineBarChart } from 'react-icons/ai';
import { useJournalistRedirect } from '@/app/Controller/Hooks/JournalistForm/useJournalistRedirect';

const FormIcon = () => {
  const { handleRedirect, userRole } = useJournalistRedirect();

  const iconClassName = 'text-2xl sm:text-3xl md:text-5xl cursor-pointer text-white';

  if (userRole === 'Administrator') {
    return (
      <AiOutlineBarChart
        className={iconClassName}
        title="Reportes"
        onClick={handleRedirect}
        role="button"
        tabIndex={0}
      />
    );
  }

  return userRole === 'Journalist' ? (
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

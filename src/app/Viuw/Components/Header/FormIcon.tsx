'use client';

import React from 'react';
import { MdAssignmentInd, MdMic } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/Controller/Context/UserContext';
import { GiNewspaper } from "react-icons/gi";
const FormIcon = () => {
  const { user } = useUser(); // Usa el contexto, no localStorage directamente
  const router = useRouter();

  const iconClassName = 'text-5xl sm:text-6xl md:text-7xl cursor-pointer text-white';

  const handleClick = () => {
    if (user?.RoleAssigned === 'Journalist') {
      router.push('/pages/channel-journalist');
    } else {
      router.push('/pages/journalistForm');
    }
  };

  const isJournalist = user?.RoleAssigned === 'Journalist';

  return isJournalist ? (
    <GiNewspaper
      className={iconClassName}
      title="Micrófono"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    />
  ) : (
    <MdAssignmentInd
      className={iconClassName}
      title="Formulario"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    />
  );
};

export default FormIcon;

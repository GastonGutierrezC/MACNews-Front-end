'use client';

import React from 'react';

interface Props {
  onChangeView: (view: 'login' | 'register') => void;
  activeView: 'login' | 'register';
}

const RegistrationChange = ({ onChangeView, activeView }: Props) => {
  const commonStyle = 'py-2 text-3xl font-black border text-center w-full';

  const activeBtnStyle = 'bg-[#5E83BA] text-black border-[#063346]';
  const inactiveBtnStyle = 'bg-[#B8D1E7] text-[#736969] border-transparent';

  return (
    <div className="flex justify-center my-6 w-[500px] mx-auto"> 
      <button
        className={`${commonStyle} ${activeBtnStyle} ${activeView === 'login' ? '' : inactiveBtnStyle} rounded-l-md`}
        onClick={() => onChangeView('login')}
      >
        Ingresar
      </button>
      <button
        className={`${commonStyle} ${activeBtnStyle} ${activeView === 'register' ? '' : inactiveBtnStyle} rounded-r-md`}
        onClick={() => onChangeView('register')}
      >
        Nuevo Usuario
      </button>
    </div>
  );
};

export default RegistrationChange;

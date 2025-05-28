'use client';

import React from 'react';
import Image from 'next/image';
import Logo from '../../../Images/news.png';
import { useLoginForm } from '@/app/Controller/Hooks/User/useLoginForm';

const LogIn = () => {
  const {
    credentials,
    handleChange,
    handleSubmit,
    loading,
    error,
  } = useLoginForm();

  const renderField = (name: keyof typeof credentials, label: string, type = 'text') => {
    const isActive = credentials[name] !== '';
    const bgColor = isActive ? '#C2D2E9' : '#B8D1E7';

    return (
      <div className="relative mb-9" style={{ width: '25rem' }}>
        {isActive && (
          <span className="absolute -top-0 left-2 bg-[#B8D1E7] px-1 text-sm font-bold text-[#EA580C]">
            {label}
          </span>
        )}
        <div
          className="p-1 rounded"
          style={{
            backgroundColor: bgColor,
            width: '100%',
            border: '14px solid #B8D1E7',
            borderRadius: '8px',
          }}
        >
          <div
            className="p-1 rounded"
            style={{
              backgroundColor: 'transparent',
              border: '2px solid black',
              borderRadius: '6px',
            }}
          >
            <input
              name={name}
              type={type}
              placeholder={label}
              value={credentials[name]}
              onChange={handleChange}
              className="py-2 rounded border-none bg-transparent"
              style={{
                width: '100%',
                paddingLeft: '1.25rem',
                paddingRight: '1.25rem',
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4 rounded shadow" style={{ width: '25rem' }}>
      <h2 className="text-5xl font-bold mb-4 text-center">Log In</h2>

      {renderField('email', 'Email')}
      {renderField('password', 'Contraseña', 'password')}

      {error && <p className="text-red-600 font-bold mb-4">{error}</p>}

      <button
        className="w-fit mx-auto bg-[#B8D1E7] text-[#2271B3] py-2 px-4 rounded border-2 border-[#063346] text-[24px] font-black hover:bg-[#2271B3] hover:text-[#B8D1E7] hover:border-[#063346] transition-all"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>

      <div className="mt-6">
        <Image
          src={Logo}
          alt="Logo"
          layout="responsive"
          width={180}
          height={180}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default LogIn;

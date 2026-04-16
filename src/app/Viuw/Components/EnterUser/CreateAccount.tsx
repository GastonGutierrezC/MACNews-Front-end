'use client';

import { useCreateAccountForm } from '@/app/Controller/Hooks/User/useCreateAccountForm';
import React from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const CreateAccount = () => {
const {
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
  errors, // 👈 nuevo
  success,
} = useCreateAccountForm();


const [showPassword, setShowPassword] = React.useState(false);

const renderField = (name: keyof typeof formData, label: string, type = 'text') => {
  const isActive = formData[name] !== '';
  const bgColor = isActive ? '#C2D2E9' : '#B8D1E7';

return (
  <div className="relative mb-6" style={{ width: '25rem' }}>
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
        {/* 🔥 ESTE ES EL CONTENEDOR CLAVE */}
        <div className="relative">
          <input
            name={name}
            type={name === 'password' ? (showPassword ? 'text' : 'password') : type}
            placeholder={label}
            value={formData[name]}
            onChange={handleChange}
            className="py-2 rounded border-none bg-transparent"
            style={{
              width: '100%',
              paddingLeft: '1.25rem',
              paddingRight: '2.5rem',
            }}
          />

          {/* 👁️ ICONO DENTRO DEL MISMO CONTENEDOR */}
          {name === 'password' && (
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-700 hover:text-black"
            >
              {showPassword ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </span>
          )}
        </div>
      </div>
    </div>

    {/* 🔥 ERROR POR CAMPO */}
    {errors[name] && (
      <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
    )}
  </div>
);
};

  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4 rounded shadow" style={{ width: '25rem' }}>
      <h2 className="text-5xl font-bold mb-4 text-center">Crea Tu Cuenta</h2>

      {renderField('nombre', 'Nombre')}
      {renderField('apellido', 'Apellido')}
      {renderField('email', 'Email')}
      {renderField('password', 'Contraseña', 'password')}

      <button
        className="w-fit mx-auto bg-[#B8D1E7] text-[#2271B3] py-2 px-4 rounded border-2 border-[#063346] text-[24px] font-black hover:bg-[#2271B3] hover:text-[#B8D1E7] hover:border-[#063346] transition-all"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Cargando...' : 'Crear Cuenta'}
      </button>

      {success && <p className="text-green-500 mt-4">Usuario creado con éxito</p>}
    </div>
  );
};

export default CreateAccount;

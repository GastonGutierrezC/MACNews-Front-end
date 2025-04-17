'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserRegistration } from '../../../Model/Entities/User';
import { useCreateUser } from '@/app/Controller/Hooks/useCreateUser';

const CreateAccount = () => {
  const router = useRouter();
  const { registerUser, loading, error, success } = useCreateUser(); 

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const userData: UserRegistration = {
      user: {
        UserFirstName: formData.nombre,
        UserLastName: formData.apellido,
        UserEmail: formData.email,
        UserImageURL: 'https://cdn-icons-png.flaticon.com/512/861/861533.png',
      },
      password: {
        PasswordUser: formData.password,
      },
    };

    await registerUser(userData); 
  };


  useEffect(() => {
    if (success) {
      console.log('Usuario creado con éxito');
      router.push('/pages'); 
    }
  }, [success, router]); 

  const renderField = (name: keyof typeof formData, label: string, type = 'text') => {
    const isActive = formData[name] !== '';
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
              value={formData[name]}
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

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Usuario creado con éxito</p>}
    </div>
  );
};

export default CreateAccount;


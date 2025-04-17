'use client';

import React, { useState } from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const UserDetails = () => {
  const { user, setUser } = useUser(); 
  const router = useRouter(); 
  const [passwordVisible, setPasswordVisible] = useState(false); 

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">No user data available</h1>
      </div>
    );
  }


  const handleLogout = () => {
    setUser(null); 
    localStorage.removeItem('user');
    router.push('/pages'); 
  };

  return (
    <div className="min-h-screen flex justify-center items-center mt-35">
      <div className="bg-[#B8D1E7] p-6 rounded-lg flex flex-col space-y-6">
       
        <h1 className="text-5xl font-bold">Datos del Usuario</h1>

      
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold">Imagen de perfil</p>
          <img
            src={user.UserImageURL}
            alt="User Avatar"
            className="w-62 h-62 rounded-full border-2 border-white shadow-md mt-2"
          />
        </div>

    
        <div className="flex flex-col space-y-5">
          <div className="p-4 bg-[#AEE1F4] rounded-lg">
            <strong>Nombre:</strong> {user.UserFirstName}
          </div>
          <div className="p-4 bg-[#AEE1F4] rounded-lg">
            <strong>Apellido:</strong> {user.UserLastName}
          </div>
          <div className="p-4 bg-[#AEE1F4] rounded-lg">
            <strong>Email:</strong> {user.UserEmail}
          </div>
          <div className="p-4 bg-[#AEE1F4] rounded-lg flex items-center justify-between">
            <strong>Contraseña:</strong> 
            <div className="flex items-center space-x-15">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={user.PasswordUser} 
                readOnly
                className="bg-[#AEE1F4] p-2 rounded-lg border-2 border-gray-300"
              />
              <button
                onClick={() => setPasswordVisible(!passwordVisible)} 
                className="text-xl"
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
        </div>

      
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDetails;


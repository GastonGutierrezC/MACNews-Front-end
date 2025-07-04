'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserRegistration } from '@/app/Model/Entities/User';
import { useCreateUser } from './useCreateUser';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export function useCreateAccountForm() {
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
    router.prefetch(ROUTES.HOME);
    router.push(ROUTES.HOME);
  }
}, [success, router]);


  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    success,
  };
}

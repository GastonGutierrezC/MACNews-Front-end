'use client';

import { useEffect, useRef, useState } from 'react';
import { UserUpdate } from '@/app/Model/Entities/UserUpdate';
import { useUpdateUser } from '@/app/Controller/Hooks/User/useUpdateUser';
import { getUserProfile } from '@/app/Model/Services/getUserProfile';

export const useUpdateUserData = () => {
  const { modifyUser, loading, error, success } = useUpdateUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const [imageURL, setImageURL] = useState('');

  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Función para cargar perfil desde el token
  const loadProfileFromToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const userProfile = await getUserProfile(token);
      setFirstName(userProfile.UserFirstName ?? '');
      setLastName(userProfile.UserLastName ?? '');
      setEmail(userProfile.UserEmail ?? '');
      setImageURL(userProfile.UserImageURL ?? '');
    } catch (err) {
      console.error('Error al cargar perfil desde token:', err);
    }
  };

  // Cargar perfil al montar
  useEffect(() => {
    loadProfileFromToken();
  }, []);

  // Si la actualización fue exitosa, cerrar modal y refrescar perfil
  useEffect(() => {
    if (success) {
      setOpen(false);
      loadProfileFromToken();
    }
  }, [success]);

  const handleSave = async () => {
    const userData: UserUpdate = {
      user: {
        UserFirstName: firstName,
        UserLastName: lastName,
        UserEmail: email,
        UserImageURL: imageURL,
      },
    };

    await modifyUser(userData);
  };

  const onSubmit = async (file: File) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      alert('Solo se permiten imágenes JPG o PNG.');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const resultImage = await response.json();
      setUploading(false);

      if (response.ok && resultImage.secure_url) {
        setImageURL(resultImage.secure_url);
      } else {
        console.error('Error al subir el archivo:', resultImage.error);
      }
    } catch (error) {
      setUploading(false);
      console.error('Error al enviar el formulario:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageURL(reader.result as string);
      reader.readAsDataURL(file);
      onSubmit(file);
    }
  };

  return {
    fileInputRef,
    firstName,
    lastName,
    email,

    imageURL,
    open,
    loading,
    uploading,
    error,
    success,
    setFirstName,
    setLastName,
    setEmail,

    setOpen,
    handleSave,
    handleImageChange,
  };
};

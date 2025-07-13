'use client';

import { useEffect, useRef, useState } from 'react';
import { UserUpdate } from '@/app/Model/Entities/UserUpdate';
import { useUpdateUser } from '@/app/Controller/Hooks/User/useUpdateUser';
import { getUserProfile } from '@/app/Model/Services/getUserProfile';
import { useImageUploader } from '../Images/useImageUploader';
import { useProfileUpdate } from '../../Context/ProfileUpdateContext';

export const useUpdateUserData = () => {
  const { modifyUser, loading, error, success } = useUpdateUser();
  const { setProfileUpdated } = useProfileUpdate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [open, setOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    uploadImage,
    uploading,
    error: uploadError
  } = useImageUploader(); // ✅ usamos el hook para subir imágenes

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

  // Si la actualización fue exitosa, cerrar modal, refrescar perfil y avisar globalmente
  useEffect(() => {
    if (success) {
      setOpen(false);
      loadProfileFromToken();
      setProfileUpdated(true);  // <-- avisamos que el perfil se actualizó
    }
  }, [success, setProfileUpdated]);

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
      const uploadedUrl = await uploadImage(file);
      if (uploadedUrl) {
        setImageURL(uploadedUrl);
      } else {
        console.error('Error al subir la imagen');
      }
    } catch (err) {
      console.error('Error inesperado al subir la imagen:', err);
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

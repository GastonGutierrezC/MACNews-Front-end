'use client';

import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { UserUpdate } from '@/app/Model/Entities/UserUpdate';
import { useUpdateUser } from '@/app/Controller/Hooks/User/useUpdateUser';

export const useUpdateUserData = () => {
  const { user } = useUser();
  const { modifyUser, loading, error, success } = useUpdateUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [imageURL, setImageURL] = useState('');

  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.UserFirstName ?? '');
      setLastName(user.UserLastName ?? '');
      setEmail(user.UserEmail ?? '');
      setPassword(user.PasswordUser ?? '');
      setImageURL(user.UserImageURL ?? '');
    }
  }, [user]);

  useEffect(() => {
    if (success) setOpen(false);
  }, [success]);

  const handleSave = async () => {
    if (!user) return;

    const userData: UserUpdate = {
      user: {
        UserFirstName: firstName,
        UserLastName: lastName,
        UserEmail: email,
        UserImageURL: imageURL,
      },
      password: {
        PasswordUser: password,
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
    password,
    imageURL,
    open,
    loading,
    uploading,
    error,
    success,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setOpen,
    handleSave,
    handleImageChange,
  };
};

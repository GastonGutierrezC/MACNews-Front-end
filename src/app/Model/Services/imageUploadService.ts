// src/Services/imageUploadService.ts
import axios from 'axios';

const API_URL = 'http://localhost:3002/upload/image';

export const uploadImage = async (file: File): Promise<string> => {
  // Validar tipo de archivo
  const validTypes = ['image/png', 'image/jpeg'];
  if (!validTypes.includes(file.type)) {
    throw new Error('Solo se permiten imágenes PNG o JPG.');
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (!token) {
    throw new Error('No estás autenticado. Inicia sesión para subir una imagen.');
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.secure_url;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Error al subir la imagen.');
  }
};

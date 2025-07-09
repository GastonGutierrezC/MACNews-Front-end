'use client'

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmitNews } from '@/app/Controller/Hooks/PublicationNews/useSubmitNews';
import { News } from '@/app/Model/Entities/NewsCreation';

export const useNewsCreation = (channelID: string) => {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/861/861533.png";
  const [imageURL, setImageURL] = useState(defaultImage);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { submitNews, loading, response, error } = useSubmitNews();

  // Mapa para traducir categorías ES -> EN
  const categoryMap: Record<string, string> = {
    Política: "Politics",
    Economía: "Economy",
    Deportes: "Sports",
    Entretenimiento: "Entertainment",
    Tecnología: "Technology",
    Salud: "Health",
    Ciencia: "Science",
    Internacional: "International",
    Sociedad: "Society",
    Seguridad: "Security",
  };

  // Mostrar categorías en español para el usuario
  const categories = Object.keys(categoryMap);

  const form = useForm<News>({
    defaultValues: {
      Title: '',
      ShortDescription: '',
      Content: '',
      PublicationDate: '',
      NewsImageURL: defaultImage,
      Categories: '',
      ChannelID: channelID,
    },
  });

  useEffect(() => {
    form.setValue("NewsImageURL", imageURL);
  }, [imageURL, form]);

  const onSubmitImage = async (file: File) => {
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Solo se permiten imágenes JPG o PNG.");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const resultImage = await response.json();
      setUploading(false);

      if (response.ok && resultImage.secure_url) {
        setImageURL(resultImage.secure_url);
        form.setValue("NewsImageURL", resultImage.secure_url);
      } else {
        console.error("Error al subir:", resultImage.error);
      }
    } catch (error) {
      setUploading(false);
      console.error("Error en subida:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageURL(reader.result as string);
      reader.readAsDataURL(file);
      onSubmitImage(file);
    }
  };

  const onSubmit = (data: News) => {
    // Traducir categoría de ES a EN antes de enviar
    const categoryEN = categoryMap[data.Categories] || data.Categories;
    const dataToSend = {
      ...data,
      Categories: categoryEN,
    };

    console.log(dataToSend);
    submitNews(dataToSend);
  };

  return {
    form,
    imageURL,
    uploading,
    loading,
    response,
    error,
    categories,
    fileInputRef,
    handleImageChange,
    onSubmit,
  };
};

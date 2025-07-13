'use client'

import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSubmitNews } from '@/app/Controller/Hooks/PublicationNews/useSubmitNews';
import { News } from '@/app/Model/Entities/NewsCreation';
import { useImageUploader } from '../Images/useImageUploader';


export const useNewsCreation = (channelID: string) => {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/861/861533.png";
  const [imageURL, setImageURL] = useState(defaultImage);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { submitNews, loading, response, error } = useSubmitNews();
  const {
    uploadImage,
    uploading: loadingImage,
    error: imageUploadError,
  } = useImageUploader();

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

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Solo se permiten imágenes PNG o JPG.");
      return;
    }

    // Mostrar preview
    const reader = new FileReader();
    reader.onload = () => setImageURL(reader.result as string);
    reader.readAsDataURL(file);

    // Subir imagen
    const uploadedUrl = await uploadImage(file);
    if (uploadedUrl) {
      setImageURL(uploadedUrl);
      form.setValue("NewsImageURL", uploadedUrl);
    }
  };

  const onSubmit = (data: News) => {
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
    loadingImage,
    loading,
    response,
    error,
    categories,
    fileInputRef,
    handleImageChange,
    onSubmit,
  };
};

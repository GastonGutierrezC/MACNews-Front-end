// src/app/Controller/Hooks/PublicationNews/useNewsCreation.ts

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

  const categories = [
    "Politics",
    "Economy",
    "Sports",
    "Entertainment",
    "Technology",
    "Health",
    "Science",
    "International",
    "Society",
    "Security",
  ];

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
    console.log(data);
    submitNews(data);
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

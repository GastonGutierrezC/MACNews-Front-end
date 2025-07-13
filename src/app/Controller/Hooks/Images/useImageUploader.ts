// src/hooks/useImageUploader.ts
import { uploadImage } from '@/app/Model/Services/imageUploadService';
import { useState } from 'react';


export const useImageUploader = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    setUploadedUrl(null);

    try {
      const url = await uploadImage(file);
      setUploadedUrl(url);
      return url;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploading,
    uploadedUrl,
    error,
    uploadImage: handleUpload,
  };
};

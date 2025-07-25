'use client';

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEvaluateApplicationForm } from "./useEvaluateApplicationForm";

import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/Utils/LinksNavigation/routes";
import { useImageUploader } from "../Images/useImageUploader";


const formSchema = z.object({
  fullName: z.string().min(2, { message: "Debe ingresar su nombre completo." }),
  birthDate: z.string().nonempty({ message: "Debe seleccionar su fecha de nacimiento." }),
  idNumber: z.string().min(5, { message: "Número de carnet inválido." }),
  reason: z.string().min(10, { message: "Explique brevemente su motivación." }),
  certificate: z.any().refine((file) => file?.length === 1, {
    message: "Debe subir un archivo de su título o certificado.",
  }),
  accepted: z.boolean().refine(val => val === true, {
    message: "Debe aceptar el reglamento para continuar.",
  }),
});

export function useJournalistApplicationForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      birthDate: "",
      idNumber: "",
      reason: "",
      certificate: undefined,
      accepted: false,
    },
  });

  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dialogType, setDialogType] = useState<'loading' | 'approved' | 'rejected' | 'error' | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { submitApplication, loading: sendingData } = useEvaluateApplicationForm();
  const { uploadImage, uploading: uploadingImage, error: imageUploadError } = useImageUploader(); // ✅ usamos el hook

  const router = useRouter();

  useEffect(() => {
    router.prefetch(ROUTES.CHANNEL_CREATION);
  }, [router]);

  const openDialog = (type: typeof dialogType) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogType(null);
  };

  const handleClickCreateChannel = () => {
    router.push(ROUTES.CHANNEL_CREATION);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const certificateFile = values.certificate[0];
      if (!["image/jpeg", "image/png"].includes(certificateFile.type)) {
        alert("Solo se permiten imágenes en formato JPG o PNG.");
        return;
      }

      setUploading(true);
      openDialog("loading");

      const uploadedUrl = await uploadImage(certificateFile);
      setUploading(false);

      if (uploadedUrl) {
        const applicationData = {
          BirthDate: values.birthDate,
          CardNumber: values.idNumber,
          Reason: values.reason,
          ImageCertificateURL: uploadedUrl,
        };

        const backendResponse = await submitApplication(applicationData);

        if (backendResponse?.VerificationStatus === "Approved") {
          setDialogType("approved");
        } else if (backendResponse?.VerificationStatus === "Rejected") {
          setDialogType("rejected");
        } else {
          setDialogType("error");
        }
      } else {
        console.error("Error al subir el archivo.");
        openDialog("error");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setUploading(false);
      openDialog("error");
    }
  };

  return {
    form,
    uploading,
    uploadingImage,
    sendingData,
    imagePreview,
    setImagePreview,
    onSubmit,
    dialogType,
    dialogOpen,
    openDialog,
    closeDialog,
    handleClickCreateChannel,
  };
}

'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/navigation'
import { useCreateChannel } from "@/app/Controller/Hooks/Channels/useCreateChannel"
import { ROUTES } from "@/app/Utils/LinksNavigation/routes"
import { useImageUploader } from "../Images/useImageUploader"


export const formSchema = z.object({
  ChannelImageURL: z.string().url({ message: "Debe ser una URL válida de imagen." }),
  ChannelName: z.string().min(2, { message: "Debe tener al menos 2 caracteres." }),
  DescriptionChannel: z.string().min(5, { message: "Debe tener al menos 5 caracteres." }),
  Specialties: z.array(z.string())
    .min(1, "Debe seleccionar al menos una especialidad.")
    .max(5, "Máximo 5 especialidades."),
})

export type FormData = z.infer<typeof formSchema>

const specialtyMap: Record<string, string> = {
  Investigación: "Investigative",
  Entrevista: "Interview",
  Opinión: "Opinion",
  Interpretación: "Interpretive",
  Datos: "Data",
  Social: "Social",
  Política: "Political",
  Científica: "Scientific",
  Espectáculo: "Entertainment",
  Negocios: "Business",
}

export function useChannelForm() {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/861/861533.png"
  const [imageURL, setImageURL] = useState(defaultImage)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const {
    uploadImage,
    uploading: uploadingImage,
    error: imageUploadError
  } = useImageUploader() // ✅ usamos el servicio centralizado

  useEffect(() => {
    router.prefetch(ROUTES.CHANNEL_JOURNALIST)
  }, [router])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ChannelImageURL: defaultImage,
      ChannelName: "",
      DescriptionChannel: "",
      Specialties: [],
    },
  })

  const {
    registerChannel,
    loading,
    error,
    success
  } = useCreateChannel()

  useEffect(() => {
    form.setValue("ChannelImageURL", imageURL)
  }, [imageURL, form])

  const onSubmit = async (values: FormData) => {
    const specialtiesTransform = values.Specialties.map(s => specialtyMap[s])
    await registerChannel(
      values.ChannelName,
      values.DescriptionChannel,
      specialtiesTransform,
      values.ChannelImageURL
    )

    router.push(ROUTES.CHANNEL_JOURNALIST)
  }

  const onSubmitImage = async (file: File) => {
    if (!file || !["image/jpeg", "image/png"].includes(file.type)) {
      alert("Solo se permiten imágenes JPG o PNG.")
      return
    }

    try {
      const uploadedUrl = await uploadImage(file)
      if (uploadedUrl) {
        setImageURL(uploadedUrl)
        form.setValue("ChannelImageURL", uploadedUrl)
      } else {
        console.error("Error al subir la imagen.")
      }
    } catch (error) {
      console.error("Error inesperado al subir imagen:", error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImageURL(reader.result as string)
      reader.readAsDataURL(file)
      onSubmitImage(file)
    }
  }

  return {
    form,
    imageURL,
    uploading: uploadingImage,
    fileInputRef,
    onSubmit,
    handleImageChange,
  }
}

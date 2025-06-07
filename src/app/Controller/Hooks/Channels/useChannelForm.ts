"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useEffect, useRef, useState } from "react"
import { useRouter } from 'next/navigation';
import { useCreateChannel } from "@/app/Controller/Hooks/Channels/useCreateChannel"
import { ROUTES } from "@/app/Utils/LinksNavigation/routes"


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
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()


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
      setUploading(true)
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const resultImage = await response.json()
      setUploading(false)

      if (response.ok && resultImage.secure_url) {
        setImageURL(resultImage.secure_url)
        form.setValue("ChannelImageURL", resultImage.secure_url)
      } else {
        console.error("Error al subir:", resultImage.error)
      }
    } catch (error) {
      setUploading(false)
      console.error("Error en subida:", error)
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
    uploading,
    fileInputRef,
    onSubmit,
    handleImageChange,
  }
}

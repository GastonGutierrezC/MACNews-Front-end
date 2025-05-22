"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller, FormProvider } from "react-hook-form"
import { z } from "zod"
import { useEffect, useRef, useState } from "react"
import { FaPencilAlt } from "react-icons/fa"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { SelectSpecialties } from "./SelectSpecialties"
import { useCreateChannel } from "@/app/Controller/Hooks/useCreateChannel"

// Mapa de traducciones
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

// Esquema de validación
export const formSchema = z.object({
  ChannelImageURL: z.string().url({ message: "Debe ser una URL válida de imagen." }),
  ChannelName: z.string().min(2, { message: "Debe tener al menos 2 caracteres." }),
  DescriptionChannel: z.string().min(5, { message: "Debe tener al menos 5 caracteres." }),
  Specialties: z.array(z.string())
    .min(1, "Debe seleccionar al menos una especialidad.")
    .max(5, "Máximo 5 especialidades."),
})

export type FormData = z.infer<typeof formSchema>

export function ChannelForm() {
  const defaultImage = "https://cdn-icons-png.flaticon.com/512/861/861533.png"
  const [imageURL, setImageURL] = useState(defaultImage)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    } = useCreateChannel();

  // Asegura que se guarde en el form también
  useEffect(() => {
    form.setValue("ChannelImageURL", imageURL)
  }, [imageURL, form])

  const onSubmit = async (values: FormData) => {
    console.log("SUBMIT ACTIVADO")
    console.log("Datos completos del formulario:", values)
    const especialitisTrasform = values.Specialties.map(s => specialtyMap[s])
    await registerChannel(values.ChannelName, values.DescriptionChannel, especialitisTrasform,values.ChannelImageURL);

  }

  const onSubmitImage = async (file: File) => {
    if (!file) return
    if (!["image/jpeg", "image/png"].includes(file.type)) {
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

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex justify-center">
            <Badge variant="title">Cuéntanos más sobre tu canal</Badge>
          </div>
          <FormLabel className="flex justify-center relative">Imagen del Canal</FormLabel>

          {/* Avatar */}
          <div className="flex justify-center relative">
            <Avatar className="w-34 h-34">
              {imageURL ? (
                <AvatarImage src={imageURL} alt="User Avatar" />
              ) : (
                <AvatarFallback>IMG</AvatarFallback>
              )}
            </Avatar>
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="imageIcon"
            >
              <FaPencilAlt size={16} />
              
            </Button>
            
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>

          {/* Channel Name */}
          <FormField
            control={form.control}
            name="ChannelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Canal</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre de tu canal" {...field} />
                </FormControl>
                <FormDescription>
                  Es el nombre con el que aparecerá tu canal en la aplicacion web.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Descripción */}
          <FormField
            control={form.control}
            name="DescriptionChannel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción del Canal</FormLabel>
                <FormControl>
                  <Input placeholder="Describe brevemente tu canal..." {...field} />
                </FormControl>
                <FormDescription>
                  Ayuda a los usuarios a conocer el enfoque de tu canal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Especialidades */}
          <FormField
  control={form.control}
  name="Specialties"
  render={({ field }) => (
    <FormItem>
      <FormControl>
        <SelectSpecialties
          value={field.value || []}
          onChange={field.onChange}
        />
      </FormControl>
    
    </FormItem>
  )}
/>


          <Button variant="bluehover" type="submit" disabled={uploading}>
            {uploading ? "Subiendo..." : "Crear canal"}
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}

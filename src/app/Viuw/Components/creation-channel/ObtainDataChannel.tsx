"use client"

import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FaPencilAlt } from "react-icons/fa"
import { SelectSpecialties } from "./SelectSpecialties"
import { useChannelForm } from "@/app/Controller/Hooks/Channels/useChannelForm"
import { FormProvider } from "react-hook-form"

export function ChannelForm() {
  const {
    form,
    imageURL,
    uploading,
    fileInputRef,
    onSubmit,
    handleImageChange,
  } = useChannelForm()

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-center">
          <Badge variant="title">Cuéntanos más sobre tu canal</Badge>
        </div>

        <FormLabel className="flex justify-center relative">Imagen del Canal</FormLabel>

        <div className="flex justify-center relative">
          <Avatar className="w-34 h-34">
            {imageURL ? <AvatarImage src={imageURL} alt="Avatar" /> : <AvatarFallback>IMG</AvatarFallback>}
          </Avatar>
          <Button type="button" onClick={() => fileInputRef.current?.click()} variant="imageIcon">
            <FaPencilAlt size={16} />
          </Button>
          <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="hidden" />
        </div>

        <FormField
          control={form.control}
          name="ChannelName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del Canal</FormLabel>
              <FormControl variant="blueBackground">
                <Input placeholder="Nombre de tu canal" {...field} />
              </FormControl>
              <FormDescription>Es el nombre con el que aparecerá tu canal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="DescriptionChannel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del Canal</FormLabel>
              <FormControl variant="blueBackground">
                <Input placeholder="Describe brevemente tu canal..." {...field} />
              </FormControl>
              <FormDescription>Ayuda a los usuarios a conocer el enfoque de tu canal.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="Specialties"
          render={({ field }) => (
            <FormItem>
              <FormControl variant="blueBackground">
                <SelectSpecialties value={field.value || []} onChange={field.onChange} />
              </FormControl>
            </FormItem>
          )}
        />

        <Button variant="bluehover" type="submit" disabled={uploading}>
          {uploading ? "Subiendo..." : "Crear canal"}
        </Button>
      </form>
    </FormProvider>
  )
}

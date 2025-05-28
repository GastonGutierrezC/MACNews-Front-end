"use client"

import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { ApplicationFormAlertDialog } from "./ApplicationFormAlerts"
import { SeeRegulations } from "./SeeRegulations"
import { useJournalistApplicationForm } from "@/app/Controller/Hooks/JournalistForm/useJournalistApplicationForm"

export function ObtainDataUser() {
  const {
    form,
    uploading,
    sendingData,
    imagePreview,
    setImagePreview,
    onSubmit,
    dialogType,
    dialogOpen,
    closeDialog,
    handleClickCreateChannel,
  } = useJournalistApplicationForm()

  return (
    <>
      <ApplicationFormAlertDialog
        open={dialogOpen}
        type={dialogType ?? "loading"}
        onClose={closeDialog}
        onCreateChannel={handleClickCreateChannel}
        onManualReview={closeDialog}
        onReturnForm={closeDialog}
      />

      <Form {...form}>
        <FormField
          control={form.control}
          name="accepted"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center text-center">
              <FormControl>
                <SeeRegulations accepted={field.value} onAcceptedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl variant="blueBackground">
                  <Input placeholder="Ej: Gastón Pérez" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de nacimiento</FormLabel>
                <FormControl variant="blueBackground">
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de carnet</FormLabel>
                <FormControl variant="blueBackground">
                  <Input placeholder="Ej: 12345678" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Motivo por el que desea ser periodista</FormLabel>
                <FormControl variant="blueBackground">
                  <Textarea placeholder="Explique su motivación..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="certificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título o certificado profesional</FormLabel>
                <FormControl variant="blueBackground">
                  <Input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        setImagePreview(URL.createObjectURL(file))
                        field.onChange(e.target.files)
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Vista previa del certificado"
                    className="mt-4 max-h-64 rounded border shadow"
                  />
                )}
              </FormItem>
            )}
          />

          <Button type="submit" variant="bluehover" disabled={uploading || sendingData}>
            {uploading ? "Subiendo archivo..." : sendingData ? "Enviando datos..." : "Enviar Solicitud"}
          </Button>
        </form>
      </Form>
    </>
  )
}

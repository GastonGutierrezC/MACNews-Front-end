"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { SeeRegulations} from "./SeeRegulations"
import { useEvaluateApplicationForm } from "@/app/Controller/Hooks/useEvaluateApplicationForm"
import { useUser } from "@/app/Controller/Context/UserContext"
import { ApplicationFormAlertDialog } from "./ApplicationFormAlerts"
import { useRouter } from 'next/navigation';



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
  
})

export function ObtainDataUser() {
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { user } = useUser()
  const { submitApplication,result, loading: sendingData } = useEvaluateApplicationForm()

  const [dialogType, setDialogType] = useState<'loading' | 'approved' | 'rejected' | 'error' | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [accepted, setAccepted] = useState(false);

  const openDialog = (type: typeof dialogType) => {
    setDialogType(type)
    setDialogOpen(true)
  }
  const router = useRouter();
  const closeDialog = () => {
    setDialogOpen(false)
    setDialogType(null)
  }
  const handleClickCreateChannel = () => {
    router.push('/pages/creation-channel');
  };
  
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
  })

  

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const certificateFile = values.certificate[0]

      if (!["image/jpeg", "image/png"].includes(certificateFile.type)) {
        alert("Solo se permiten imágenes en formato JPG o PNG.")
        return
      }

      setUploading(true)
      openDialog("loading")

      const formData = new FormData()
      formData.append("file", certificateFile)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const resultImage = await response.json()
      setUploading(false)

      if (response.ok && resultImage.secure_url) {
        console.log("Archivo subido con éxito:", resultImage.secure_url)

        if (!user || !user.id) {
          alert("Debe iniciar sesión para enviar la solicitud.")
          return
        }

        const applicationData = {
          UserID: user.id,
          BirthDate: values.birthDate,
          CardNumber: values.idNumber,
          Reason: values.reason,
          ImageCertificateURL: resultImage.secure_url,
        }

        console.log("Enviando solicitud al backend:", applicationData)

        const response = await submitApplication(applicationData)

        if (response?.VerificationStatus === "Approved") {
          setDialogType("approved")
        } else if(response?.VerificationStatus === "Rejected") {
          setDialogType("rejected")
        } else {
          setDialogType("error")
        }
        
        

      } else {
        console.error("Error al subir el archivo:", resultImage.error)
        openDialog("error")
      }
    } catch (error) {
      setUploading(false)
      console.error("Error al enviar el formulario:", error)
      openDialog("error")
      
    }
  }


  return (
    
    <>
    <ApplicationFormAlertDialog
      open={dialogOpen}
      type={dialogType ?? "loading"}
      onClose={closeDialog}
      onCreateChannel={() => {
        handleClickCreateChannel()
        // lógica para redireccionar o abrir modal de creación de canal
      }}
      onManualReview={() => {
        closeDialog()
        // lógica para enviar a revisión manual
      }}
      onReturnForm={() => {
        closeDialog()
      }}
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
              <FormDescription>
                Puede subir una imagen en formato JPG o PNG.
              </FormDescription>
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

        <Button variant="bluehover" type="submit" disabled={uploading || sendingData}>
            {uploading
              ? "Subiendo archivo..."
              : sendingData
              ? "Enviando datos..."
              : "Enviar Solicitud "}
          </Button>
        </form>
      </Form>
    </>
  )
}
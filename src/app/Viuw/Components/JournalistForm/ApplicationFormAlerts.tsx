'use client'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/alert-dialog'
import { Loader2, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { AiOutlineFileExcel } from "react-icons/ai";
import { MdCancelScheduleSend } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { useRouter } from 'next/navigation';



interface Props {
  open: boolean
  type: 'loading' | 'approved' | 'rejected' | 'error'
  onClose: () => void
  onCreateChannel?: () => void
  onManualReview?: () => void
  onReturnForm?: () => void
}

export const ApplicationFormAlertDialog = ({
  open,
  type,
  onClose,
  onCreateChannel,
  onManualReview,
  onReturnForm
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        {type === 'loading' && (
          <>
            <AlertDialogHeader>
              <div className="flex items-center space-x-3">
                <Loader2 className="animate-spin text-blue-500" />
                <AlertDialogTitle>Verificando solicitud...</AlertDialogTitle>
              </div>
              <AlertDialogDescription>
                Estamos analizando tu información, esto tomará solo unos segundos.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </>
        )}

        {type === 'approved' && (
          <>
            <AlertDialogHeader>
            <div className="flex flex-col items-center space-y-4">
                <AlertDialogTitle>¡Solicitud Aprobada!</AlertDialogTitle>
                <HiOutlineDocumentText className="text-[#5E83BA] text-6xl sm:text-7xl md:text-8xl lg:text-9xl" />
              </div>
              <AlertDialogDescription>
                Tu formulario fue aprobado correctamente. Ya podés crear tu canal de noticias.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={onCreateChannel}>
                Crear canal
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}

{type === 'rejected' && (
  <>
    <AlertDialogHeader>
      <div className="flex flex-col items-center space-y-4">
        <AlertDialogTitle>Solicitud Rechazada</AlertDialogTitle>
        <AiOutlineFileExcel className="text-[#5E83BA] text-6xl sm:text-7xl md:text-8xl lg:text-9xl" />
      </div>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={onReturnForm}>
        Volver al formulario
      </AlertDialogCancel>
      <AlertDialogAction onClick={onManualReview}>
        Enviar a revisión manual
      </AlertDialogAction>
    </AlertDialogFooter>
  </>
)}


        {type === 'error' && (
          <>
            <AlertDialogHeader>
              <div className="flex items-center space-x-3">
                
              < MdCancelScheduleSend className="text-[#5E83BA] text-4xl sm:text-5xl md:text-6xl lg:text-7xl" />
                
                <AlertDialogTitle>No se logró enviar tu solicitud. Inténtelo nuevamente más tarde.</AlertDialogTitle>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={onReturnForm}>
                Volver al formulario
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

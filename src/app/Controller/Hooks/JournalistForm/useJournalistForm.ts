"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateJournalist } from "@/app/Controller/Hooks/Channels/useCreateJournalist";

const formSchema = z.object({
  Specialty: z.string().min(2, {
    message: "Specialty must be at least 2 characters.",
  }),
  JournalisticExperience: z.string().min(2, {
    message: "Experience must be at least 2 characters.",
  }),
});

export type JournalistFormData = z.infer<typeof formSchema>;

export function useJournalistForm(onComplete: () => void) {
  const form = useForm<JournalistFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Specialty: "",
      JournalisticExperience: "",
    },
  });

  const {
    registerJournalist,
    loading,
    error,
    success
  } = useCreateJournalist();

  const onSubmit = async (values: JournalistFormData) => {
    await registerJournalist(values.Specialty, values.JournalisticExperience);
  };

  useEffect(() => {
    if (success) {
      onComplete();
    }
  }, [success, onComplete]);

  return {
    form,
    onSubmit,
    loading,
    error,
  };
}

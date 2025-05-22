"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCreateJournalist } from "@/app/Controller/Hooks/useCreateJournalist";


const formSchema = z.object({
  Specialty: z.string().min(2, {
    message: "Specialty must be at least 2 characters.",
  }),
  JournalisticExperience: z.string().min(2, {
    message: "Experience must be at least 2 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function JounalistForm({ onComplete }: { onComplete: () => void }) {
  const form = useForm<FormData>({
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

  const onSubmit = async (values: FormData) => {
    await registerJournalist(values.Specialty, values.JournalisticExperience);
  };

  // Llama a onComplete cuando el registro sea exitoso
  useEffect(() => {
    if (success) {
      onComplete();
    }
  }, [success, onComplete]);

  return (
    <Form {...form}>
      <div className="flex justify-center">
        <Badge variant="title">Cuéntanos más sobre ti</Badge>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Specialty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>¿En qué tipo de noticias te especializas?</FormLabel>
              <FormControl>
                <Input placeholder="Política, deportes, cultura..." {...field} />
              </FormControl>
              <FormDescription>Tu área de enfoque periodístico.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="JournalisticExperience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tu experiencia como periodista</FormLabel>
              <FormControl>
                <Input placeholder="Trabajé 5 años en TV nacional..." {...field} />
              </FormControl>
              <FormDescription>
                Breve descripción de tu trayectoria profesional.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <Button variant="bluehover" type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Siguiente"}
        </Button>
      </form>
    </Form>
  );
}

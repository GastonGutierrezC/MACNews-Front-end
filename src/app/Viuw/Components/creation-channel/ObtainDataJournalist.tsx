"use client";

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
import { useJournalistForm } from "@/app/Controller/Hooks/JournalistForm/useJournalistForm";


export function JounalistForm({ onComplete }: { onComplete: () => void }) {
  const { form, onSubmit, loading, error } = useJournalistForm(onComplete);

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
              <FormControl variant="blueBackground">
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
              <FormControl variant="blueBackground">
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

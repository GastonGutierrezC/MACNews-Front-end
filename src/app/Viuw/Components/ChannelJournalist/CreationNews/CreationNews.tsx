'use client';

import React, { useRef, useState, useEffect } from 'react';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form';
import { FaPencilAlt } from 'react-icons/fa';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { ChevronDown } from 'lucide-react';

import { useNewsCreation } from '@/app/Controller/Hooks/PublicationNews/useNewsCreation';
import ViolationsAndSuggestions from './ViolationsAndSuggestions';

interface CreationNewsProps {
  channelID: string;
}

const CreationNews: React.FC<CreationNewsProps> = ({ channelID }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const originalContentRef = useRef<string>(''); // Guarda el contenido original

  const {
    form,
    imageURL,
    uploading,
    loading,
    response,
    error,
    categories,
    handleImageChange,
    onSubmit,
  } = useNewsCreation(channelID);

  useEffect(() => {
    if (response && response !== true && !originalContentRef.current) {
      originalContentRef.current = form.watch('Content');
    }
  }, [response, form]);

  const togglePanel = () => setIsPanelOpen((prev) => !prev);
const [hasResponded, setHasResponded] = useState(false);


useEffect(() => {
  if (( response === true || !isPanelOpen) && !hasResponded) {
    setHasResponded(true);
  }
}, [response, isPanelOpen, hasResponded]);


  return (
<div
  className={`flex min-h-screen w-full px-4 gap-6 ${
    !hasResponded ? 'ml-50' : ''
  } ${
    isPanelOpen
      ? 'flex-col sm:flex-row justify-center items-center sm:items-start'
      : 'flex-col justify-center items-center'
  }`}
>



      {/* Formulario: con flex y centrado */}
      <div
        className={`max-w-2xl w-full
          ${isPanelOpen ? 'sm:basis-1/2 flex flex-col justify-center' : ''}
        `}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">

            <div className="text-center">
              <FormLabel>Imagen de la Noticia</FormLabel>
            </div>

            <div className="flex justify-center relative">
              <img
                src={imageURL}
                alt="Imagen de la noticia"
                className="w-full max-w-sm h-auto object-cover rounded-lg"
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                variant="imageIcon"
                className="absolute bottom-4 right-4"
              >
                <FaPencilAlt size={26} />
              </Button>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {/* Título */}
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-start gap-y-2 sm:gap-x-3">
                  <FormLabel className="sm:w-40 pt-2">Título</FormLabel>
                  <div className="flex-1">
                    <FormControl variant="blueBackground">
                      <Input placeholder="Título de la noticia" {...field} />
                    </FormControl>
                    <FormDescription>Título principal de la noticia.</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Descripción Corta */}
            <FormField
              control={form.control}
              name="ShortDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-start gap-y-2 sm:gap-x-3">
                  <FormLabel className="sm:w-40 pt-2">Descripción Corta</FormLabel>
                  <div className="flex-1">
                    <FormControl variant="blueBackground">
                      <Input placeholder="Breve descripción..." {...field} />
                    </FormControl>
                    <FormDescription>Resumen breve del contenido.</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Fecha */}
            <FormField
              control={form.control}
              name="PublicationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-start gap-y-2 sm:gap-x-3">
                  <FormLabel className="sm:w-40 pt-2">Fecha de Publicación</FormLabel>
                  <div className="flex-1">
                    <FormControl variant="blueBackground">
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>Fecha en que se publicará la noticia.</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Categoría */}
            <FormField
              control={form.control}
              name="Categories"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-start gap-y-2 sm:gap-x-3">
                  <FormLabel className="sm:w-40 pt-2">Categoría</FormLabel>
                  <div className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl variant="blueBackground">
                          <Button
                            variant="outline"
                            role="combobox"
                            className="w-full sm:w-[300px] justify-between"
                          >
                            {field.value
                              ? categories.find((c) => c === field.value)
                              : "Selecciona una categoría"}
                            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-[300px] p-0">
                        <Command>
                          <CommandInput placeholder="Buscar categoría..." />
                          <CommandEmpty>No se encontró categoría.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                key={category}
                                onSelect={() => field.onChange(category)}
                              >
                                {category}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormDescription>Selecciona la categoría principal de la noticia.</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Contenido */}
            <FormField
              control={form.control}
              name="Content"
              render={({ field }) => (
                <FormItem className="flex flex-col sm:flex-row sm:items-start gap-y-2 sm:gap-x-3">
                  <FormLabel className="sm:w-40 pt-2">Contenido</FormLabel>
                  <div className="flex-1">
                    <FormControl variant="blueBackground">
                      <Textarea
                        placeholder="Contenido completo de la noticia..."
                        rows={10}
                        wrap="soft"
                        className="w-full resize-y whitespace-pre-wrap break-words"
                        style={{ wordBreak: 'break-word' }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Redacta el cuerpo completo de la noticia.</FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            {/* Botón de envío */}
            <div className="flex justify-center">
              <Button variant="bluehover" type="submit" disabled={loading} className="w-full sm:w-auto" >
                
                {loading ? 'Enviando...' : 'Crear Noticia'}
              </Button>
            </div>

            {/* Mensajes */}
            {error && <p className="text-red-500 text-center">❌ Error: {error}</p>}
            {response === true && <p className="text-green-600 text-center">✅ Noticia creada exitosamente.</p>}
          </form>
        </Form>
      </div>

      {/* Panel lateral de sugerencias y violaciones */}
      <div
        className={`${isPanelOpen ? 'basis-1/3 sm:basis-1/4' : 'w-fit'} transition-all duration-200`}
      >
<ViolationsAndSuggestions
  response={response}
  isOpen={isPanelOpen}
  onToggle={togglePanel}
  formWatchContent={form.watch('Content')}
  formSetValue={form.setValue}
/>

      </div>
    </div>
  );
};

export default CreationNews;

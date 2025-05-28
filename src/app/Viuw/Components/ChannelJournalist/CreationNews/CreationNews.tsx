// CreationNews.tsx
'use client';

import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useSubmitNews } from '@/app/Controller/Hooks/PublicationNews/useSubmitNews';
import { News } from '@/app/Model/Entities/NewsCreation';


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

  return (
    <div className="flex justify-center mt-10 relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">

          <FormLabel className="flex justify-center relative">Imagen de la Noticia</FormLabel>

          <div className="flex justify-center relative">
            <img
              src={imageURL}
              alt="Imagen de la noticia"
              className="w-100 h-100 object-cover rounded-lg"
            />
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              variant="imageIcon"
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

          <FormField
            control={form.control}
            name="Title"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormLabel className="whitespace-nowrap w-40 pt-2">Título</FormLabel>
                <div className="flex flex-col flex-1">
                  <FormControl variant="blueBackground">
                    <Input placeholder="Título de la noticia" {...field} />
                  </FormControl>
                  <FormDescription>
                    Título principal de la noticia.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ShortDescription"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormLabel className="whitespace-nowrap w-40 pt-2">Descripción Corta</FormLabel>
                <div className="flex flex-col flex-1">
                  <FormControl variant="blueBackground">
                    <Input placeholder="Breve descripción..." {...field} />
                  </FormControl>
                  <FormDescription>
                    Resumen breve del contenido.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="PublicationDate"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormLabel className="whitespace-nowrap w-40 pt-2">Fecha de Publicación</FormLabel>
                <div className="flex flex-col flex-1">
                  <FormControl variant="blueBackground">
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormDescription>
                    Fecha en que se publicará la noticia.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Categories"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormLabel className="whitespace-nowrap w-40 pt-2">Categoría</FormLabel>
                <div className="flex flex-col flex-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl variant="blueBackground">
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-[300px] justify-between"
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

                  <FormDescription>
                    Selecciona la categoría principal de la noticia.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="Content"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3">
                <FormLabel className="whitespace-nowrap w-40 pt-2">Contenido</FormLabel>
                <div className="flex flex-col flex-1">
                  <FormControl variant="blueBackground">
                    <Textarea
                      placeholder="Contenido completo de la noticia..."
                      rows={10}
                      wrap="soft"
                      className="w-full resize-y whitespace-pre-wrap break-words"
                      style={{ width: '490px', wordBreak: 'break-word' }}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Redacta el cuerpo completo de la noticia.
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button variant="bluehover" type="submit" disabled={loading}>
            {loading ? 'Enviando...' : 'Crear Noticia'}
          </Button>

          {error && <p className="text-red-500">❌ Error: {error}</p>}
          {response === true && <p className="text-green-600">✅ Noticia creada exitosamente.</p>}
        </form>
      </Form>

      {response && response !== true && <ViolationsAndSuggestions response={response} />}
      
    </div>
  );
};

export default CreationNews;

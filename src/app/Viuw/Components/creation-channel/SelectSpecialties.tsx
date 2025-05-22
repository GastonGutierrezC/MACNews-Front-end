import React, { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { MdClose } from "react-icons/md"

interface SelectSpecialtiesProps {
  value: string[] // valor actual del campo
  onChange: (value: string[]) => void // función para actualizar el valor
}

const specialtyES: string[] = [
  "Investigación",
  "Entrevista",
  "Opinión",
  "Interpretación",
  "Datos",
  "Social",
  "Política",
  "Científica",
  "Espectáculo",
  "Negocios",
]

export function SelectSpecialties({ value, onChange }: SelectSpecialtiesProps) {
  const [open, setOpen] = useState(false)

  const removeSpecialty = (valueToRemove: string) => {
    const filtered = value.filter((item) => item !== valueToRemove)
    console.log("eliminado")
    onChange(filtered)
  }

  const addSpecialty = (valueToAdd: string) => {
    if (value.length >= 5) return
    onChange([...value, valueToAdd])
  }

  const handleSelect = (selectedValue: string) => {
    if (value.includes(selectedValue)) {
      removeSpecialty(selectedValue)
    } else {
      addSpecialty(selectedValue)
    }
  }

  return (
    <FormItem className="flex flex-col">
      <FormLabel>Especialidades</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[300px] justify-between",
              !value.length && "text-muted-foreground"
            )}
          >
            {value.length > 0
              ? `${value.length} especialidad(es) seleccionada(s)`
              : "Selecciona hasta 5 especialidades"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Buscar..." className="h-9" />
            <CommandList>
              <CommandEmpty>No se encontró resultado.</CommandEmpty>
              <CommandGroup>
                {specialtyES.map((item) => (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={() => handleSelect(item)}
                  >
                    {item}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value.includes(item) ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="mt-2 flex flex-wrap gap-2">
  {value.map((item) => (
    <Badge
      key={item}
      variant="secondary"
      className="flex items-center gap-1"
    >
      {item}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          removeSpecialty(item)
          console.log("eliminado")
        }}
        className="p-0 m-0 bg-transparent border-0 cursor-pointer"
        aria-label={`Eliminar ${item}`}
      >
        <MdClose className="h-3 w-3" />
      </button>
    </Badge>
  ))}
</div>



      <FormDescription>
        Selecciona las especialidades que definen mejor tu canal (máx. 5).
      </FormDescription>
      <FormMessage />
    </FormItem>
  )
}

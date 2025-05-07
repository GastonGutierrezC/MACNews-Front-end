"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import { Button } from "@/components/ui/button";

interface SeeRegulationsProps {
  accepted: boolean;
  onAcceptedChange: (newValue: boolean) => void;
}

export const SeeRegulations: React.FC<SeeRegulationsProps> = ({
  accepted,
  onAcceptedChange,
}) => {
  const handleCheckboxChange = () => {
    onAcceptedChange(!accepted);
  };

  return (
    <Dialog>
      <div className="flex items-center gap-x-2">
        <DialogTrigger asChild>
          <Button variant="bluehover" >
            Normas Que Todo Periodista Debe Cumplir
          </Button>
        </DialogTrigger>

        <Checkbox
          id="trigger-accept-rules"
          checked={accepted}
          onCheckedChange={handleCheckboxChange}
          variant="blackBorder"
        />
      </div>
      <DialogContent className="max-h-[90vh] overflow-y-auto bg-[#CBD7E9] ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center bg-[#5E83BA] rounded-3xl border-4 border-black p-4 text-black">
            EL CÓDIGO INTERNACIONAL DE ÉTICA PERIODÍSTICA DE LA UNESCO
          </DialogTitle>

          <div className="mt-4 space-y-4 text-justify  text-black text-sm">
            <p><strong>El derecho del pueblo a una información verídica:</strong><br />
            Todas las personas tienen el derecho fundamental de recibir información precisa, completa y verificada. La transparencia y la exactitud en la difusión de noticias son esenciales para que el público pueda tomar decisiones informadas y participar activamente en la sociedad.</p>

            <p><strong>Adhesión del periodista a la realidad objetiva:</strong><br />
            Se requiere que los periodistas se comprometan a reflejar la realidad de manera objetiva, evitando distorsiones o interpretaciones subjetivas. Esto implica una rigurosa verificación de hechos y la presentación de datos que correspondan fielmente a los acontecimientos, contribuyendo a mantener la credibilidad del medio.</p>

            <p><strong>La responsabilidad social del periodista:</strong><br />
            Los profesionales del periodismo deben considerar el impacto que sus publicaciones pueden tener en la sociedad. Este principio demanda una labor informativa que contribuya al bienestar público, evitando la difusión de contenidos que puedan incitar al sensacionalismo o causar perjuicios innecesarios a la comunidad.</p>

            <p><strong>La integridad profesional del periodista:</strong><br />
            Se enfatiza la importancia de actuar con honestidad, independencia y ética profesional. Mantener la integridad implica evitar conflictos de interés y garantizar que el proceso de recolección y difusión de la información se realice de manera imparcial y con compromiso con la verdad.</p>

            <p><strong>Acceso y participación del público:</strong><br />
            Este principio reconoce que la ciudadanía tiene el derecho de acceder a la información y de participar en el proceso informativo. Fomentar la interacción y el feedback entre periodistas y lectores no solo enriquece la cobertura periodística, sino que también fortalece la transparencia y la rendición de cuentas.</p>

            <p><strong>Respeto de la vida privada y de la dignidad del hombre:</strong><br />
            Mientras se difunden noticias de interés público, es fundamental proteger la intimidad de las personas y salvaguardar su dignidad. Los medios deben evitar la exposición indebida de información personal que no tenga relevancia para el interés general, protegiendo así los derechos individuales.</p>

            <p><strong>Respeto del interés público:</strong><br />
            La selección y presentación de las noticias debe orientarse hacia el beneficio de la sociedad en general, priorizando el interés colectivo sobre intereses particulares o comerciales. Este enfoque asegura que la información difundida contribuya a la construcción de una opinión pública informada y equilibrada.</p>

            <p><strong>Respeto de los valores universales y la diversidad de las culturas:</strong><br />
            Los medios deben promover una visión inclusiva que reconozca y valore la diversidad cultural y los principios universales de derechos humanos. Esto implica evitar estereotipos y prejuicios, así como ofrecer una representación justa y plural de las distintas realidades que coexisten en la sociedad.</p>

            <p><strong>La eliminación de la guerra y otras grandes plagas a las que la humanidad está confrontada:</strong><br />
            Este principio, de carácter más aspiracional, invita al periodismo a contribuir a la construcción de un mundo más pacífico y justo. Se espera que la labor informativa fomente el diálogo, la reconciliación y la búsqueda de soluciones para los conflictos y problemas globales, utilizando la información como herramienta para la promoción de la paz y el desarrollo social.</p>
          </div>


 <div className="flex items-center gap-2 mt-4 p-4 rounded-md bg-[#CBD7E9]">
            <Checkbox
              id="dialog-accept-rules"
              checked={accepted}
              onCheckedChange={handleCheckboxChange}
              variant="blackBorder"
            />
            <label htmlFor="dialog-accept-rules" className="text-sm text-black">
              Acepto cumplir con todas estas normativas
            </label>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
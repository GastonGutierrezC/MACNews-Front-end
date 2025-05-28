// components/ViolationsAndSuggestions.tsx
'use client';

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface Violation {
  principle: string;
  explanation: string;
  suggestion: string;
}

interface ResponseData {
  violations: Violation[];
}

interface Props {
  response: ResponseData | true | null;
}

export default function ViolationsAndSuggestions({ response }: Props) {
  if (!response || response === true) return null;

  return (
    <div className="absolute left-300 ml-6 top-200 w-[300px] flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="bluehover">📜 Normas Incumplidas</Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-10 bg-[#C2D2E9] text-black w-[300px] max-h-[250px] overflow-y-auto"
          align="start"
        >
          <p className="font-semibold mb-2">Estas son las normas éticas que se han incumplido:</p>
          <ul className="list-disc pl-4 text-sm">
            {response.violations.map((v, i) => (
              <li key={i}>
                <strong>{v.principle}</strong>: {v.explanation}
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="bluehover">💡 Sugerencias de Mejora</Button>
        </PopoverTrigger>
        <PopoverContent
          className="z-10 bg-[#C2D2E9] text-black w-[300px] max-h-[250px] overflow-y-auto"
          align="start"
        >
          <p className="font-semibold mb-2">Recomendaciones para mejorar el contenido:</p>
          <ul className="list-disc pl-4 text-sm">
            {response.violations.map((v, i) => (
              <li key={i}>{v.suggestion}</li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}

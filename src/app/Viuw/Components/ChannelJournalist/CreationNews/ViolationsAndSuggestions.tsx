'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import ApplyAISuggestionsButton from './ApplyAISuggestionsButton';
import { News } from '@/app/Model/Entities/NewsCreation';
import { UseFormSetValue } from 'react-hook-form';


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
  isOpen: boolean;
  onToggle: () => void;
  formWatchContent: string;
 formSetValue: UseFormSetValue<News>;
}

export default function ViolationsAndSuggestions({
  response,
  isOpen,
  onToggle,
  formWatchContent,
  formSetValue,
}: Props) {
  // No renderiza nada si aún no hay respuesta o si ya fue enviado con éxito
  if (!response || response === true) return null;

  return (
    <div className="flex flex-col h-full w-full">
      {/* Botón abrir/cerrar recomendaciones */}
      <div className="mb-4">
        <Button onClick={onToggle} variant="bluehover">
          {isOpen ? '❌ Cerrar Recomendaciones' : '📜 Ver Recomendaciones'}
        </Button>
      </div>

      {/* Panel visible solo si isOpen === true */}
      {isOpen && (
        <div className="flex-1 bg-[#C2D2E9] text-black shadow-lg overflow-y-auto p-6 rounded">
          <h2 className="text-lg font-semibold mb-4">Normas Éticas Incumplidas</h2>
          <ul className="list-disc pl-5 text-sm mb-6">
            {response.violations.map((v, i) => (
              <li key={i} className="mb-2">
                <strong>{v.principle}</strong>: {v.explanation}
              </li>
            ))}
          </ul>

          <h2 className="text-lg font-semibold mb-2">Sugerencias de Mejora</h2>
          <ul className="list-disc pl-5 text-sm mb-4">
            {response.violations.map((v, i) => (
              <li key={i} className="mb-1">{v.suggestion}</li>
            ))}
          </ul>

<ApplyAISuggestionsButton
  content={formWatchContent} // contenido actual del formulario
  suggestions={response.violations.map((v) => v.suggestion)} // las sugerencias a enviar
  onApplied={(updatedContent) => {
    // Esto reemplaza el contenido del campo 'Content' con la noticia actualizada
    formSetValue('Content', updatedContent);
  }}
/>

        </div>
      )}
    </div>
  );
}

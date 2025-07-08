'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { useUpdateNewsByAgent } from '@/app/Controller/Hooks/PublicationNews/useUpdateNewsByAgent';

interface Props {
  content: string; // El contenido original desde el formulario
  suggestions: string[]; // Array de sugerencias de ViolationsAndSuggestions
  onApplied: (updatedContent: string) => void; // Para reemplazar el contenido en el formulario
}

const ApplyAISuggestionsButton: React.FC<Props> = ({ content, suggestions, onApplied }) => {
  const { updateNews, loading, error } = useUpdateNewsByAgent();

  const handleApplySuggestions = async () => {
    const newContent = await updateNews({
      newsContent: content,
      externalSuggestions: suggestions.map((s) => ({ suggestion: s })),
    });

    if (newContent) {
      onApplied(newContent);
    }
  };

  return (
    <div className="mt-6 flex flex-col items-center gap-2">
      <Button onClick={handleApplySuggestions} disabled={loading} variant="bluehover">
        {loading ? 'Aplicando sugerencias...' : '🧠 Aplicar Sugerencias con IA'}
      </Button>
      {error && <p className="text-red-600 text-sm text-center">Error: {error}</p>}
    </div>
  );
};

export default ApplyAISuggestionsButton;

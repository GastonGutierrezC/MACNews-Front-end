// src/app/pages/journalistForm/JournalistForm.tsx
'use client';

import { Badge } from '@/components/ui/badge';
import React from 'react';

import { ObtainDataUser } from './ObtainDataUser';
  

export const JournalistForm: React.FC = () => {
  return (
    <div className="pt-64 max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-md space-y-6">
      <div className="flex justify-center">
        <Badge variant="title">Formulario para Solicitar ser Periodista</Badge>
      </div>
      <ObtainDataUser/>
    </div>
  );
};


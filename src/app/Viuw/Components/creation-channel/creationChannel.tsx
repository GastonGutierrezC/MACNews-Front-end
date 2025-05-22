'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { JounalistForm } from './ObtainDataJournalist';
import { ChannelForm } from './ObtainDataChannel';

export const CreationChannel: React.FC = () => {
  const [journalistCompleted, setJournalistCompleted] = useState(false);

  return (
    <div className="pt-64 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">

      <div className="flex items-center justify-between px-6 relative">
        <div className="flex-1 h-0.5 bg-muted-foreground transition-all duration-700 ease-in-out" />

        <div className="relative z-10 mx-2 flex flex-col items-center">
          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl shadow-lg
              transition-colors duration-700 ease-in-out
              ${journalistCompleted ? 'bg-[#063346]' : 'bg-blue-500 scale-100'}
            `}
          >
            🪪
          </div>
          <span className="text-xs mt-2 text-muted-foreground transition-opacity duration-700">
            Periodista
          </span>
        </div>

        <div className="flex-1 h-0.5 bg-muted-foreground transition-all duration-700 ease-in-out" />

        <div className="relative z-10 mx-2 flex flex-col items-center">
          <div
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl shadow-lg
              transition-colors duration-700 ease-in-out
              ${journalistCompleted ? 'bg-blue-500 scale-110' : 'bg-gray-400 scale-100'}
            `}
          >
            🎤
          </div>
          <span className="text-xs mt-2 text-muted-foreground transition-opacity duration-700">
            Canal
          </span>
        </div>

        <div className="flex-1 h-0.5 bg-muted-foreground transition-all duration-700 ease-in-out" />
      </div>
        {!journalistCompleted && (

            <JounalistForm onComplete={() => setJournalistCompleted(true)} />
        
        )}
        {journalistCompleted && (
      
            <ChannelForm />
          
        )}
      
    </div>
  );
};

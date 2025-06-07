'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Progress } from '@/components/ui/progress';

export default function RouteProgress() {
  const pathname = usePathname();

  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout1: NodeJS.Timeout;
    let timeout2: NodeJS.Timeout;
    let timeout3: NodeJS.Timeout;

    const startProgress = () => {
      setVisible(true);
      setProgress(30);
      timeout1 = setTimeout(() => setProgress(60), 300);
      timeout2 = setTimeout(() => setProgress(90), 600);
    };

    const completeProgress = () => {
      timeout3 = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 300);
      }, 900);
    };

    // Inicia animación de carga inmediatamente
    startProgress();

    // Completa la animación cuando la ruta efectivamente cambió
    completeProgress();

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [pathname]);

  useEffect(() => {
    // Bonus: detecta si el usuario volvió a la pestaña, reinicia barra
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setProgress(100);
        setTimeout(() => {
          setVisible(false);
          setProgress(0);
        }, 300);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-[175px] left-0 right-0 z-50">
      <Progress value={progress} className="h-1 rounded-none bg-red-600" />
    </div>
  );
}

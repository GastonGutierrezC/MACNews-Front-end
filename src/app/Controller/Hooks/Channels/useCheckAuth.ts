// app/Controller/Hooks/Auth/useCheckAuth.ts
'use client';

export const useCheckAuth = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  return {
    isAuthenticated: !!token, // true si hay token, false si no
    token, // por si lo necesitas luego
  };
};

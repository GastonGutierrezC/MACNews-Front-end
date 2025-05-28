// app/Controller/Hooks/Auth/useCheckAuth.ts
"use client";

import { useUser } from "../../Context/UserContext";



export const useCheckAuth = () => {
  const { user } = useUser();

  return {
    isAuthenticated: !!user, // true si hay usuario, false si no
    user, // por si lo necesitas luego
  };
};

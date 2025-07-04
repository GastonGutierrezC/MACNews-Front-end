'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface TokenContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

// Crear contexto
const TokenContext = createContext<TokenContextProps | undefined>(undefined);

// Provider
export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  // Guardar token y sincronizar con localStorage
  const setToken = (newToken: string | null) => {
    if (newToken) {
      setTokenState(newToken);
      localStorage.setItem('token', newToken);
      console.log('[TokenContext] Token guardado:', newToken);
    } else {
      setTokenState(null);
      localStorage.removeItem('token');
      console.log('[TokenContext] Token eliminado');
    }
  };

  // Cargar token desde localStorage al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setTokenState(storedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
  };

  return (
    <TokenContext.Provider value={{ token, setToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook personalizado
export const useToken = (): TokenContextProps => {
  const context = useContext(TokenContext);
  if (!context) throw new Error('useToken must be used within a TokenProvider');
  return context;
};

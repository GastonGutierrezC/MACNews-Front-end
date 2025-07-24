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

// Crear el contexto
const TokenContext = createContext<TokenContextProps | undefined>(undefined);

// Provider del contexto
export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);

  // Al montar, intentar cargar el token desde localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setTokenState(storedToken);
      console.log('[TokenContext] Token cargado desde localStorage:', storedToken);
    }
  }, []);

  // Función para establecer o eliminar el token
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

  // Función para cerrar sesión
  const logout = () => {
    setToken(null); // Esto borra de estado y localStorage
  };

  return (
    <TokenContext.Provider value={{ token, setToken, logout }}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook para consumir el contexto
export const useToken = (): TokenContextProps => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};

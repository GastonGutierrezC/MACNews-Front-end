'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';
import { jwtDecode } from 'jwt-decode';

interface TokenContextProps {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

interface DecodedToken {
  exp: number; // Fecha de expiración en segundos
  [key: string]: any;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const router = useRouter();

  // Función para verificar si el token expiró
  const isTokenExpired = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // segundos
      return decoded.exp <= currentTime;
    } catch (err) {
      console.error('[TokenProvider] Error decodificando token:', err);
      return true; // si hay error al decodificar, consideramos expirado
    }
  };

  // Al montar, cargar token desde localStorage y validar expiración
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        console.log('[TokenProvider] Token expirado, eliminando...');
        setTokenState(null);
        localStorage.removeItem('token');
      } else {
        setTokenState(storedToken);
        console.log('[TokenProvider] Token cargado desde localStorage:', storedToken);
      }
    }
    setLoading(false); // Terminó la carga inicial
  }, []);

  // Función para establecer o eliminar el token
  const setToken = (newToken: string | null) => {
    if (newToken) {
      if (isTokenExpired(newToken)) {
        console.log('[TokenProvider] Token recibido ya expirado, eliminando...');
        setTokenState(null);
        localStorage.removeItem('token');
        router.push(ROUTES.LOGIN);
      } else {
        setTokenState(newToken);
        localStorage.setItem('token', newToken);
        console.log('[TokenProvider] Token guardado:', newToken);
      }
    } else {
      setTokenState(null);
      localStorage.removeItem('token');
      console.log('[TokenProvider] Token eliminado');
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    router.push(ROUTES.LOGIN);
  };

  // Mientras cargamos token, no renderizamos hijos
  if (loading) return null;

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

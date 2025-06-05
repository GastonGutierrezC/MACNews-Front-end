'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

// Interface User
export interface User {
  id: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string;
  RoleAssigned: string;
  JournalistID?: string;
}

export interface RawUserFromBackend {
  UserID: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string;
  RoleAssigned: string;
  JournalistID?: string;
}

type NormalizableUser = User | RawUserFromBackend;

interface UserContextProps {
  user: User | null;
  setUser: (user: NormalizableUser | null) => void;
  // Eliminamos promoteToJournalist para evitar confusión, usamos solo setJournalistAndPromote
  setJournalistAndPromote: (journalist: { JournalistID: string }) => void;
  journalistID?: string;
}

// Crear contexto
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  // Normalizar user (backend -> frontend)
  const normalizeUser = (rawUser: RawUserFromBackend): User => ({
    id: rawUser.UserID,
    UserFirstName: rawUser.UserFirstName,
    UserLastName: rawUser.UserLastName,
    UserEmail: rawUser.UserEmail,
    UserImageURL: rawUser.UserImageURL,
    PasswordUser: rawUser.PasswordUser,
    RoleAssigned: rawUser.RoleAssigned,
    JournalistID: rawUser.JournalistID ?? undefined,
  });

  // setUser que normaliza y sincroniza localStorage
  const setUser = (userData: NormalizableUser | null) => {
    if (userData) {
      const normalizedUser = 'UserID' in userData ? normalizeUser(userData) : userData;
      setUserState(normalizedUser);
      localStorage.setItem('user', JSON.stringify(normalizedUser));
      console.log('[UserContext] Usuario guardado:', normalizedUser);
    } else {
      setUserState(null);
      localStorage.removeItem('user');
      console.log('[UserContext] Usuario limpiado');
    }
  };

  // Función combinada que actualiza JournalistID y cambia rol a Journalist
  const setJournalistAndPromote = (journalist: { JournalistID: string }) => {
    if (user) {
      const updatedUser = {
        ...user,
        JournalistID: journalist.JournalistID,
        RoleAssigned: 'Journalist',
      };
      setUser(updatedUser);
    }
  };

  // Cargar usuario guardado en localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('[UserContext] Error parsing stored user:', err);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setJournalistAndPromote,
        journalistID: user?.JournalistID,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado
export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

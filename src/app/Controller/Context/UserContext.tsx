'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';

export interface User {
  id: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string;
}

export interface RawUserFromBackend {
  UserID: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string;
}

type NormalizableUser = User | RawUserFromBackend;

interface UserContextProps {
  user: User | null;
  setUser: (user: NormalizableUser | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      console.log('[UserContext] Usuario cargado desde localStorage:', parsedUser);
      setUserState(parsedUser);
    }
  }, []);

  const setUser = (userData: NormalizableUser | null) => {
    if (userData === null) {
      setUserState(null);
      localStorage.removeItem('user');
      return;
    }

    let normalizedUser: User;

    if ('UserID' in userData) {
      // Es un RawUserFromBackend
      console.log('[UserContext] Normalizando usuario del backend:', userData);

      const {
        UserID,
        UserFirstName,
        UserLastName,
        UserEmail,
        UserImageURL,
        PasswordUser
      } = userData;

      normalizedUser = {
        id: UserID,
        UserFirstName: UserFirstName ?? '',
        UserLastName: UserLastName ?? '',
        UserEmail: UserEmail ?? '',
        UserImageURL: UserImageURL ?? '',
        PasswordUser: PasswordUser ?? ''
      };
    } else {
      // Ya es un User
      normalizedUser = userData;
      console.log('[UserContext] Usuario ya normalizado:', normalizedUser);
    }

    setUserState(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    console.log('[UserContext] Usuario guardado en contexto y localStorage:', normalizedUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de <UserProvider>');
  return context;
};

'use client';

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect
} from 'react';

interface User {
  id: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string; 
}

interface RawUserFromBackend {
  UserID: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string; 
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | RawUserFromBackend | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log('[UserContext] Usuario cargado desde localStorage:', parsedUser);
      setUser(parsedUser);
    }
  }, []);

  const updateUser = (userData: User | RawUserFromBackend | null) => {
    if (userData === null) {
      setUser(null);
      localStorage.removeItem('user');
      return;
    }

    console.log('[UserContext] Datos recibidos para guardar:', userData);

    let normalizedUser: User;

    if ('UserID' in userData) {
     
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
      normalizedUser = userData;
    }

    setUser(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    console.log('[UserContext] Usuario guardado en contexto y localStorage:', normalizedUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de <UserProvider>');
  return context;
};

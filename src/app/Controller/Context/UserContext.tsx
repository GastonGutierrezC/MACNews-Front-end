// UserContext.tsx

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
  RoleAssigned: string;
}

export interface RawUserFromBackend {
  UserID: string;
  UserFirstName: string;
  UserLastName: string;
  UserEmail: string;
  UserImageURL: string;
  PasswordUser: string;
  RoleAssigned: string;
}

type NormalizableUser = User | RawUserFromBackend;

interface UserContextProps {
  user: User | null;
  journalistID: string | null;
  setUser: (user: NormalizableUser | null) => void;

  setJournalist: (data: { JournalistID: string } | null) => void;  // <-- aquí

}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [journalistID, setJournalistID] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedJournalist = localStorage.getItem('journalistID');

    if (storedUser) {
      const parsedUser: User = JSON.parse(storedUser);
      setUserState(parsedUser);
      console.log('[UserContext] Usuario cargado desde localStorage:', parsedUser);
    }

    if (storedJournalist) {
      setJournalistID(storedJournalist);
      console.log('[UserContext] JournalistID cargado desde localStorage:', storedJournalist);
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
      const {
        UserID,
        UserFirstName,
        UserLastName,
        UserEmail,
        UserImageURL,
        PasswordUser,
        RoleAssigned
      } = userData;

      normalizedUser = {
        id: UserID,
        UserFirstName: UserFirstName ?? '',
        UserLastName: UserLastName ?? '',
        UserEmail: UserEmail ?? '',
        UserImageURL: UserImageURL ?? '',
        PasswordUser: PasswordUser ?? '',
        RoleAssigned: RoleAssigned ?? ''
      };
    } else {
      normalizedUser = userData;
    }

    setUserState(normalizedUser);
    localStorage.setItem('user', JSON.stringify(normalizedUser));
    console.log('[UserContext] Usuario guardado en contexto y localStorage:', normalizedUser);
  };

const setJournalist = (data: { JournalistID: string } | null) => {
  if (data === null) {
    setJournalistID(null);
    localStorage.removeItem('journalistID');
    console.log('[UserContext] JournalistID eliminado del contexto y localStorage');
    return;
  }
  setJournalistID(data.JournalistID);
  localStorage.setItem('journalistID', data.JournalistID);
  console.log('[UserContext] JournalistID guardado en contexto y localStorage:', data.JournalistID);
};


  return (
    <UserContext.Provider value={{ user, journalistID, setUser, setJournalist }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser debe usarse dentro de <UserProvider>');
  return context;
};

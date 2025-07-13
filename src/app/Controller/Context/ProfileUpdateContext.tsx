// src/app/Controller/Context/ProfileUpdateContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

type ProfileUpdateContextType = {
  profileUpdated: boolean;
  setProfileUpdated: (updated: boolean) => void;
};

const ProfileUpdateContext = createContext<ProfileUpdateContextType | undefined>(undefined);

export const ProfileUpdateProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileUpdated, setProfileUpdated] = useState(false);

  return (
    <ProfileUpdateContext.Provider value={{ profileUpdated, setProfileUpdated }}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};

export const useProfileUpdate = () => {
  const context = useContext(ProfileUpdateContext);
  if (!context) {
    throw new Error('useProfileUpdate must be used within a ProfileUpdateProvider');
  }
  return context;
};

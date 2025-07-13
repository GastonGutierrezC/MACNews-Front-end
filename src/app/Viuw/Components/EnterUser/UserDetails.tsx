'use client';

import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { UpdateUserData } from './UpdateUserData';
import { useUserDetailsLogic } from '@/app/Controller/Hooks/User/useUserDetailsLogic';
import { useProfileUpdate } from '@/app/Controller/Context/ProfileUpdateContext';

const UserDetails = () => {
  const { user, handleLogout, refreshUserProfile } = useUserDetailsLogic();
  const { profileUpdated, setProfileUpdated } = useProfileUpdate();

  // Cuando la bandera global indique un cambio de perfil, refrescamos y reseteamos
  useEffect(() => {
    if (profileUpdated) {
      refreshUserProfile();
      setProfileUpdated(false);
    }
  }, [profileUpdated, refreshUserProfile, setProfileUpdated]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">No user data available</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center pt-60 pb-30">
      <Card className="w-full max-w-xl bg-[#B8D1E7] p-6 space-y-6">
        <div className="flex justify-center">
          <Badge variant="title">Datos del Usuario</Badge>
        </div>

        <CardContent className="flex flex-col items-center space-y-6">
          <div className="text-center">
            <Badge variant="text">Imagen de perfil</Badge>
            <img
              src={user.UserImageURL}
              alt="User Avatar"
              className="w-42 h-42 rounded-full border-2 border-white shadow-md mt-2"
            />
          </div>

          <Separator />
          <Badge variant="userData">Nombre: {user.UserFirstName}</Badge>
          <Badge variant="userData">Apellido: {user.UserLastName}</Badge>
          <Badge variant="userData">Email: {user.UserEmail}</Badge>
        </CardContent>

        <CardFooter className="flex justify-center space-x-6">
          <Button onClick={handleLogout} variant="redhover">
            Logout
          </Button>
          <UpdateUserData />
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDetails;

'use client';

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useFollowedChannels } from "@/app/Controller/Hooks/User/useFollowedChannels";
import { TiThMenu } from "react-icons/ti";
import Logo from '../../../Images/logo2.png';
import UserIcon from '../Header/UserIcon';
import FormIcon from "../Header/FormIcon";
import { useCheckAuth } from "@/app/Controller/Hooks/Channels/useCheckAuth";
import { useChannelNavigation } from '@/app/Controller/Hooks/ShowNews/useChannelNavigation';

export function UserChannelsSheet() {
  const { isAuthenticated } = useCheckAuth();
  const { channels, loading, error, refreshChannels } = useFollowedChannels();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      refreshChannels();
    }
  }, [open]);

  const { navigateToChannel } = useChannelNavigation();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="filterNews"><TiThMenu /></Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-60 bg-[#B8D1E7]">
        <SheetHeader className="bg-[#063346]">
          <img
            src={Logo.src}
            alt="Logo"
            className="object-contain w-full h-auto"
          />
        </SheetHeader>

        {/* Íconos móviles */}
        <div className="flex gap-4 items-center justify-center my-2 lg:hidden">
          <FormIcon />
          <UserIcon />
        </div>

        <SheetTitle>Canales Seguidos</SheetTitle>

        <div className="mt-4 space-y-4 overflow-y-auto max-h-[80vh] pr-2">
          {!isAuthenticated ? (
            <p className="text-gray-700 font-medium">
              Si quieres ver tus canales regístrate
            </p>
          ) : (
            <>
              {loading && <p>Cargando canales...</p>}
              {error && <p className="text-red-500">Error: {error}</p>}
              {!loading && channels.length === 0 && (
                <p className="text-gray-500">No estás siguiendo ningún canal.</p>
              )}
              {channels.map((channel) => (
                <div
                  key={channel.ChannelID}
                  onClick={() => navigateToChannel(channel.ChannelName, channel.CreatorFullName)}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={channel.ChannelImageURL} alt={channel.ChannelName} />
                    <AvatarFallback>{channel.ChannelName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{channel.ChannelName}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useFollowedChannels } from "@/app/Controller/Hooks/useFollowedChannels";

export function UserChannelsSheet() {
  const { channels, loading, error } = useFollowedChannels();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="bluehover">Mis Canales</Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Canales Seguidos</SheetTitle>
        </SheetHeader>

        <div className="mt-4 space-y-4 overflow-y-auto max-h-[80vh] pr-2">
          {loading && <p>Cargando canales...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && channels.length === 0 && (
            <p className="text-gray-500">No estás siguiendo ningún canal.</p>
          )}
          {channels.map((channel) => (
            <div
              key={channel.ChannelID}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <Image
                src={channel.ChannelImageURL}
                alt={channel.ChannelName}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="font-medium">{channel.ChannelName}</span>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}

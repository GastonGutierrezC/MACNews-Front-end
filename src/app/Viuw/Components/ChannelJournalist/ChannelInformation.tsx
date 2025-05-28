import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import React from 'react';

interface ChannelInformationProps {
  channel: {
    ChannelName: string;
    DescriptionChannel: string;
    Specialties: string[];
    ChannelImageURL: string;
    Specialty: string;
    JournalisticExperience: string;
    creatorFullName: string;
    followers: number;
    NumberNews: number;
  };
}

const ChannelInformation: React.FC<ChannelInformationProps> = ({ channel }) => {
  return (
    <div className="w-full p-4 rounded-xl shadow-md bg-white">

      {/* Grid responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">

        {/* Columna 1: Avatar + Nombre del canal */}
        <div className="flex flex-col items-center justify-center gap-2">
  <Avatar className="w-60 h-60 sm:w-80 sm:h-80 md:w-80 md:h-80 border-4">
    <AvatarImage src={channel.ChannelImageURL} alt={channel.ChannelImageURL} />
    <AvatarFallback>CN</AvatarFallback>
  </Avatar>
  <Badge variant="channel" className="text-center">
    {channel.ChannelName}
  </Badge>
</div>


        {/* Columna 2: Información del canal */}
        <div className="space-y-4 mt-6 lg:mt-0 ">
        <p className="flex justify-center">
  <Badge className="text-center" variant="userData2">
    {channel.creatorFullName} - {channel.followers} suscriptores - {channel.NumberNews} noticias
  </Badge>
</p>


          <p>
  <Badge
    variant="text"
    className="block text-justify w-full break-words whitespace-pre-line"
  >
    {channel.DescriptionChannel}
  </Badge>
</p>


          <p className="flex flex-wrap gap-2">
            <Badge variant="userData5">Este Canal Se Dedica a:</Badge>

            <Badge className="block text-justify w-full break-words whitespace-pre-line" variant="userData3">{channel.Specialty}</Badge>
          </p>

          <p className="flex flex-wrap gap-2">
            <Badge variant="userData5">Sobre el Periodista:</Badge>
            <Badge className="block text-justify w-full break-words whitespace-pre-line" variant="userData3">{channel.JournalisticExperience}</Badge>
          </p>

          <p>
            <Badge className="block text-justify break-words whitespace-pre-line" variant="split2">
              Especialidades: {channel.Specialties.join(' - ')}
            </Badge>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ChannelInformation;

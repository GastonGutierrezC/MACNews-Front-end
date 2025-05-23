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
    <div className="w-full p-4 rounded-xl shadow-md">

      {/* Grid container con responsive cols, ocupa todo el ancho sin margen */}
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-x-6 items-start w-full">

        {/* Columna 1: imagen + nombre */}
        <div className="relative">
          <Badge variant="channel" className="ml-4 sm:ml-10 md:ml-25 pl-4 sm:pl-10 md:pl-50">
            {channel.ChannelName}
          </Badge>
          <Avatar className="w-85 h-85 -mt-5 sm:-mt-10 md:-mt-20 border-4">
            <AvatarImage src={channel.ChannelImageURL} alt={channel.ChannelImageURL} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Columna 2: resto de datos */}
        <div className="space-y-1 mt-20">
          <p>
            <Badge className="text-center" variant="userData2">
              {channel.creatorFullName} - {channel.followers} suscriptores - {channel.NumberNews} noticias
            </Badge>
          </p>

          <p>
            <Badge variant="text">
              {channel.DescriptionChannel}
            </Badge>
          </p>

          <p>
            <Badge variant="userData2">Este Canal Se Dedica a:</Badge>
            <Badge variant="userData3">{channel.Specialty}</Badge>
          </p>

          <p>
            <Badge variant="userData2">Sobre el Periodista:</Badge>
            <Badge variant="userData3">{channel.JournalisticExperience}</Badge>
          </p>

          <p>
            <Badge className="text-center" variant="split2">
              Especialidades: {channel.Specialties.join(' - ')}
            </Badge>
          </p>
        </div>

      </div>
    </div>
  );
};

export default ChannelInformation;

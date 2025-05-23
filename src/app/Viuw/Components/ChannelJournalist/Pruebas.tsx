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
    <div className="w-full p-4 bg-white rounded-xl shadow-md space-y-1"> {/* espacio vertical menor */}
      
      <Badge variant="channel" className="ml-4 sm:ml-10 md:ml-25 pl-4 sm:pl-10 md:pl-33">
        {channel.ChannelName}
      </Badge>

      <Avatar className="w-65 h-65 -mt-5 sm:-mt-10 md:-mt-20 border-4">
        <AvatarImage src={channel.ChannelImageURL} alt={channel.ChannelImageURL} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <p className="text-center ml-2 sm:ml-10 md:ml-65 mt-0"> {/* eliminamos margen superior */}
        <Badge variant="userData2">
          {channel.creatorFullName} - {channel.followers} suscriptores - {channel.NumberNews} noticias
        </Badge>
      </p>

      <p className="ml-2 sm:ml-10 md:ml-65 mt-0">
        <Badge variant="text">
          {channel.DescriptionChannel}
        </Badge>
      </p>

      <p className="ml-2 sm:ml-10 md:ml-65 mt-0">
        <Badge variant="userData2">Este Canal Se Dedica a:</Badge>
        <Badge variant="userData3">{channel.Specialty}</Badge>
      </p>

      <p className="ml-2 sm:ml-10 md:ml-65 mt-0">
        <Badge variant="userData2">Sobre el Periodista:</Badge>
        <Badge variant="userData3">{channel.JournalisticExperience}</Badge>
      </p>

      <p className="text-center ml-2 sm:ml-10 md:ml-45 mt-0">
        <Badge variant="split2">
          Especialidades: {channel.Specialties.join(' - ')}
        </Badge>
      </p>
    </div>
  );
};

export default ChannelInformation;
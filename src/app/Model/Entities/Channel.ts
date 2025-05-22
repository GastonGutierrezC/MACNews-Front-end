// src/Model/Entities/Channel.ts

export interface ChannelRequest {
    JournalistID: string;
    ChannelName: string;
    DescriptionChannel: string;
    Specialties: string[];
    ChannelImageURL: string;
  }
  
  export interface ChannelResponse {
    ChannelID: string;
    ChannelName: string;
    DescriptionChannel: string;
    Specialties: string[];
    ChannelImageURL: string;
    Journalist: {
      JournalistID: string;
      Specialty: string;
      JournalisticExperience: string;
      IsActive: boolean;
      DateCreated: string;
    };
  }
  
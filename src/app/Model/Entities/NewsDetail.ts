export interface Channel {
    ChannelID: string;
    ChannelName: string;
    DescriptionChannel: string;
    Specialties: string[];
    ChannelImageURL: string;
  }
  
  export interface NewsDetail {
    NewsId: string;
    Title: string;
    ShortDescription: string;
    Content: string;
    PublicationDate: string;
    NewsStatus: string;
    NewsImageURL: string;
    Categories: string;
    Channel: Channel;
  }
  
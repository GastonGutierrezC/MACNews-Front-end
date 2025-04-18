

// app/Model/Entities/NewsRecommendations.ts

export interface Channel {
    ChannelID: string;
    ChannelName: string;
    ChannelImageURL: string;
  }
  
  export interface NewsRecommendations {
    NewsId: string;
    Title: string;
    PublicationDate: string;
    NewsImageURL: string;
    Categories: string;
    Channel: Channel;
    VisitCount: number;
  }
  
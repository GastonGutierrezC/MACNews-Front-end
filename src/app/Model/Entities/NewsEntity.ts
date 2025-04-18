// app/Model/Entities/NewsEntity.ts

// app/Model/Entities/NewsEntity.ts

export interface Channel {
    ChannelID: string;
    ChannelName: string;
    ChannelImageURL: string;
  }
  
  export interface NewsEntity {
    NewsId: string;
    Title: string;
    PublicationDate: string;
    NewsImageURL: string;
    Categories: string;
    Channel: Channel;
    VisitCount: number;
  }
  
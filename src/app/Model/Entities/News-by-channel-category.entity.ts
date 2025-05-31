// src/app/Entities/NewsByChannelCategoryEntity.ts

export interface ChannelEntity {
  ChannelID: string;
  ChannelName: string;
  ChannelImageURL: string;
}

export interface NewsByChannelCategoryEntity {
  NewsId: string;
  Title: string;
  PublicationDate: string;
  NewsImageURL: string;
  Categories: string;
  Channel: ChannelEntity;
  VisitCount: number;
  CreatorFullName:string;
}

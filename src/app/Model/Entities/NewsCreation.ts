// types/News.ts

export interface News {
    ChannelID: string;
    Title: string;
    ShortDescription: string;
    Content: string;
    PublicationDate: string;
    NewsImageURL: string;
    Categories: string;
  }
  
  export interface EthicalViolation {
    principle: string;
    explanation: string;
    suggestion: string;
  }
  
  export interface NewsErrorResponse {
    message: string;
    violations: EthicalViolation[];
  }
  
  export type NewsResponse = true | NewsErrorResponse;
  
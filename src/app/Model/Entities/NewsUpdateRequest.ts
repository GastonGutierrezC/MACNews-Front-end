export interface ExternalSuggestion {
  suggestion: string;
}

export interface NewsUpdateRequest {
  newsContent: string;
  externalSuggestions: ExternalSuggestion[];
}

export interface NewsUpdateResponse {
  newNews: string;
}

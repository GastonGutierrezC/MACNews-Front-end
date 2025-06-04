// entities/ChannelMetric.ts

export interface TopInterest {
  interest: string;
  percentage: number;
}

export interface ChannelMetric {
  MetricID: string;
  ChannelID: string;
  TopInterests: TopInterest[];
  Observation: string;
  AnalysisDate: string; // o Date si la vas a parsear
}

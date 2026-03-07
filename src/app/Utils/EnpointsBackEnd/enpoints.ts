export const ENDPOINTS = {
  
    // Users 
  UPDATE_USER: 'http://localhost:3002/users',
  CREATE_USER: 'http://localhost:3002/auth/register',
  USER_PROFILE: 'http://localhost:3002/users/profile',
  USER_LOGIN: 'http://localhost:3002/auth/login',
  USER_SEARCH_HISTORY: 'http://localhost:3002/searchHistory',
  GET_USER_SEARCH_HISTORY: 'http://localhost:3002/searchHistory/user',
  USER_VISIT_HISTORY: 'http://localhost:3002/visits',
  UPLOAD_IMAGE: 'http://localhost:3002/upload/image',
    // News
  NEWS_CHANNEL: 'http://localhost:3002/news/channel',  
  NEWS_ALL_CARD: 'http://localhost:3002/news/card',
  NEWS_ALL_CARD_BY_DATE: 'http://localhost:3002/news/card/by-date',
  NEWS_RECOMMENDATIONS: 'http://localhost:3002/news/recommendations',
  NEWS_BY_CATEGORY: 'http://localhost:3002/news/category',
  NEWS_BY_CHANNEL_CATEGORY: 'http://localhost:3002/news/channel/category',
  NEWS_BY_SPECIALITY: 'http://localhost:3002/news/specialty', 
  NEWS_TITLE_DATE: 'http://localhost:3002/news/title/date',
  NEWS_GET_TOP: 'http://localhost:3002/news',
  NEWS_SEARCH: 'http://localhost:3002/news/searchIntelligent',
  NEWS_UPDATE_BY_AGENT: 'http://localhost:3002/news/update-by-agent',
  CREATE_NEWS: 'http://localhost:3002/news',

    // Channels
  GET_METRICTS_CATEGORY: 'http://localhost:3002/news/metrics/categories',
  GET_CHANNEL_JOURNALIST: 'http://localhost:3002/channels/journalist',
  GET_CHANNEL_BY_NAME_AND_CREATOR: 'http://localhost:3002/channels/by-channel-name-and-creator',  
  GET_FOLLOWED_CHANNELS: 'http://localhost:3002/followChannels/user',
  GET_TOP_CHANNELS: 'http://localhost:3002/channels/top',
  CREATE_JOURNALIST_CHANNEL: 'http://localhost:3002/journalist',
  CREATE_COMMENT: 'http://localhost:3002/comment-post', 
  FOLLOW_CHANNEL: 'http://localhost:3002/followChannels', 
  GET_COMMENTS_POST: 'http://localhost:3002/comment-post/channel',
  CREATE_CHANNEL: 'http://localhost:3002/channels',
  GET_CHANNEL_METRICS: 'http://localhost:3002/channel-metrics/channel',
  CREATE_APPLICATION: 'http://localhost:3002/applicationForm/evaluate-with-agent',
  UNFOLLOW_CHANNEL: 'http://localhost:3002/followChannels',
  // Reports

  USERS_BY_MONTH_REPORT: 'http://localhost:3002/reports/users-by-month',
  USERS_ACTIVITY_REPORT: 'http://localhost:3002/reports/user-activity',
  USERS_ROLES_REPORT: 'http://localhost:3002/reports/users-role-distribution',
  USERS_PENDING_APPLICATION_REPORT: 'http://localhost:3002/reports/pending-applications',
  NEWS_REVIEW_REPORT: 'http://localhost:3002/reports/news-review',


  // Admin aprove Users
  CHANGE_USER_ROLE: 'http://localhost:3002/users/changeRole/',
  VERIFY_APPLICATION: 'http://localhost:3002/applicationForm/verification/',

}

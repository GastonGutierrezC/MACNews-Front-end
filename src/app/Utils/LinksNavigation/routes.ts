// app/utils/routes.ts

export const ROUTES = {
  CHANNEL_JOURNALIST: "/pages/channel-journalist",
  CATEGORY: (category: string) => `/pages/category/${category}`,
  SPECIALITY: (specialty: string) => `/pages/speciality/${specialty}`,
  CHANNEL_CREATION: "/pages/creation-channel",
  SEARCH: (search: string) => `/pages/search/${search}`,
  NEWS_DETAIL: (title: string, date: string) => `/pages/news/${encodeURIComponent(title)}/${encodeURIComponent(date)}`,
  JOURNALIST_FORM: "/pages/journalistForm",
  LAST_NEWS: "/pages/last-news",
  HOME: "/pages",
  LOGIN: "/pages/enterUser",
  PROFILE_USER: "/pages/userData",
  CHANNEL_NEWS: (channelName: string, creatorFullName: string) => `/pages/channel-news/${encodeURIComponent(channelName)}/${encodeURIComponent(creatorFullName)}`,


}

// app/Model/Services/GetFollowedChannelsService.ts
import { FollowedChannelEntity } from '@/app/Model/Entities/FollowedChannelEntity';

export const getFollowedChannels = async (userId: string): Promise<FollowedChannelEntity[]> => {
  const response = await fetch(`http://localhost:3002/followChannels/user/${userId}`);

  if (!response.ok) {
    throw new Error(`Error fetching followed channels for user ${userId}: ${response.statusText}`);
  }

  const data: FollowedChannelEntity[] = await response.json();
  return data;
};

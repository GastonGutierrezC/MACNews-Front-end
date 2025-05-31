// NO debe tener 'use client' porque es un Server Component

import React from 'react';
import NewsDetailRender from '@/app/Viuw/Components/NewsDetail/NewsDetailRender';
import ChannelView from '@/app/Viuw/Components/ChannelView/ChannelView';

interface PageProps {
  params: Promise<{
    channelName: string;
    creatorFullName: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  // Esperar a que params se resuelva porque es una Promise
  const { channelName, creatorFullName } = await params;

  const decodedChannelName = decodeURIComponent(channelName);
  const decodedCreatorFullName = decodeURIComponent(creatorFullName);

  return (
    <div>
      <ChannelView channelName={decodedChannelName} creatorFullName={decodedCreatorFullName} />
    </div>
  );
};

export default Page;

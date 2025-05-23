import { ChannelInfo } from '../Entities/ChannelInfo';

export async function getChannelByJournalistId(journalistId: string): Promise<ChannelInfo | null> {
  try {
    const response = await fetch(`http://localhost:3002/channels/journalist/${journalistId}`);

    if (!response.ok) {
      console.error(`Error al obtener canal del periodista con ID ${journalistId}:`, response.statusText);
      return null;
    }

    const data: ChannelInfo = await response.json();
    return data;
  } catch (error) {
    console.error('Error de red al obtener canal por journalistId:', error);
    return null;
  }
}

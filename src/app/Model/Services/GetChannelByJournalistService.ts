import { ChannelInfo } from '../Entities/ChannelInfo';

export async function getChannelByJournalist(): Promise<ChannelInfo | null> {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token no disponible para obtener el canal del periodista');
      return null;
    }

    const response = await fetch(`http://localhost:3002/channels/journalist`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error(`Error al obtener canal del periodista:`, response.statusText);
      return null;
    }

    const data: ChannelInfo = await response.json();
    return data;
  } catch (error) {
    console.error('Error de red al obtener canal del periodista:', error);
    return null;
  }
}

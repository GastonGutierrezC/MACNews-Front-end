import { useState } from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useRouter } from 'next/navigation';

export const useUserDetailsLogic = () => {
  const { user, setUser,setJournalist } = useUser();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleLogout = () => {
    setUser(null);
    setJournalist(null);                      // <-- eliminamos journalistID del contexto
    localStorage.removeItem('user');
    localStorage.removeItem('journalistID'); // <-- eliminamos journalistID del localStorage
    router.push('/pages');
  };

  return {
    user,
    passwordVisible,
    togglePasswordVisibility,
    handleLogout,
  };
};

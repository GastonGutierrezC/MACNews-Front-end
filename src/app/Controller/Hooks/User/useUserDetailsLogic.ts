import { useState } from 'react';
import { useUser } from '@/app/Controller/Context/UserContext';
import { useRouter } from 'next/navigation';

export const useUserDetailsLogic = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/pages');
  };

  return {
    user,
    passwordVisible,
    togglePasswordVisibility,
    handleLogout,
  };
};

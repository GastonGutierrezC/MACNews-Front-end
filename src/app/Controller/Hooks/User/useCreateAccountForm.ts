'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserRegistration } from '@/app/Model/Entities/User';
import { useCreateUser } from './useCreateUser';
import { ROUTES } from '@/app/Utils/LinksNavigation/routes';

export function useCreateAccountForm() {
  const router = useRouter();
  const { registerUser, loading, error, success } = useCreateUser();

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const validatePassword = (password: string): string | null => {
  if (!/(?=.*[a-z])/.test(password)) {
    return 'La contraseña debe contener al menos una letra minúscula.';
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return 'La contraseña debe contener al menos una letra mayúscula.';
  }

  if (!/(?=.*\d)/.test(password)) {
    return 'La contraseña debe contener al menos un número.';
  }

  if (!/(?=.*[@$!%*?&])/.test(password)) {
    return 'La contraseña debe contener al menos un carácter especial (@$!%*?&).';
  }

  if (!/^[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
    return 'La contraseña debe tener al menos 8 caracteres.';
  }

  return null;
};

const validateFields = (): string | null => {
  if (!formData.nombre.trim()) {
    return 'El nombre es obligatorio.';
  }

  if (!formData.apellido.trim()) {
    return 'El apellido es obligatorio.';
  }

  if (!formData.email.trim()) {
    return 'El email es obligatorio.';
  }

  if (!formData.password.trim()) {
    return 'La contraseña es obligatoria.';
  }

  return null;
};

const [localError, setLocalError] = useState<string>('');

const [errors, setErrors] = useState<{
  nombre?: string;
  apellido?: string;
  email?: string;
  password?: string;
}>({});


const validateForm = () => {
  const newErrors: typeof errors = {};

  // Nombre
  if (!formData.nombre.trim()) {
    newErrors.nombre = 'El nombre es obligatorio.';
  }

  // Apellido
  if (!formData.apellido.trim()) {
    newErrors.apellido = 'El apellido es obligatorio.';
  }

  // Email
  if (!formData.email.trim()) {
    newErrors.email = 'El email es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = 'El email no es válido.';
  }

  // Password
  if (!formData.password.trim()) {
    newErrors.password = 'La contraseña es obligatoria.';
  } else {
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
    }
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


const handleSubmit = async () => {
  const isValid = validateForm();

  if (!isValid) return;

  const userData: UserRegistration = {
    user: {
      UserFirstName: formData.nombre,
      UserLastName: formData.apellido,
      UserEmail: formData.email,
      UserImageURL: 'https://cdn-icons-png.flaticon.com/512/861/861533.png',
    },
    password: {
      PasswordUser: formData.password,
    },
  };

  await registerUser(userData);
};

  // ✅ Redirigir en caso de éxito
  useEffect(() => {
    if (success) {
      console.log('Usuario creado con éxito');
      router.prefetch(ROUTES.HOME);
      router.push(ROUTES.HOME);
    }
  }, [success, router]);


return {
  formData,
  handleChange,
  handleSubmit,
  loading,
  error, // backend
  errors, // 🔥 frontend por campo
  success,
};
}

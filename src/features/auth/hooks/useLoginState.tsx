import { useState } from 'react';
import useInput from './useInput';

export const useLoginState = () => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  return {
    email,
    onEmailChange,
    password,
    onPasswordChange,
    showPassword,
    setShowPassword,
    rememberMe,
    setRememberMe,
    loading,
    setLoading,
  };
};

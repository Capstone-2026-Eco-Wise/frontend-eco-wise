import { useState } from "react";
import useInput from "@/hooks/useInput";

export const useRegisterState = () => {
  const [fullName, onFullNameChange] = useInput("");
  const [username, onUsernameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    fullName,
    onFullNameChange,
    username,
    onUsernameChange,
    email,
    onEmailChange,
    password,
    onPasswordChange,
    showPassword,
    setShowPassword,
    loading,
    setLoading,
    error,
    setError,
  };
};

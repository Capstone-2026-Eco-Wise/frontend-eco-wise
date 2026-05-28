import { useState } from "react";
import useInput from "@/hooks/useInput";

export const useAdminRegisterState = () => {
  const [fullName, onFullNameChange] = useInput("");
  const [username, onUsernameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [adminSecret, onAdminSecretChange] = useInput("");
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
    adminSecret,
    onAdminSecretChange,
    showPassword,
    setShowPassword,
    loading,
    setLoading,
    error,
    setError,
  };
};

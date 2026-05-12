import { useState, useRef } from "react";
import useInput from "@/hooks/useInput";
import { useAuth } from "@/contexts/AuthContext";
import { updateAvatar } from "@/services/userService";

export const useSettingsState = () => {
  const { user } = useAuth();

  const [fullName, onFullNameChange] = useInput(
    user?.user_metadata?.full_name || "Eco Warrior",
  );
  const [username, onUsernameChange] = useInput(
    user?.user_metadata?.username || "ecowarrior",
  );

  const [currentPassword, onCurrentPasswordChange] = useInput("");
  const [newPassword, onNewPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");

  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  
  // State untuk Avatar
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    setIsSaving(true);
    // Simulasi request ke backend untuk teks (berhubung endpoint belum ada)
    setTimeout(() => {
      setIsSaving(false);
      setIsAlertOpen(true);
      if (showPasswordChange) {
        setShowPasswordChange(false);
      }
    }, 1500);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingAvatar(true);
      await updateAvatar(file);
      // Sukses! Kamu bisa tambahkan refresh atau update context di sini
      window.location.reload(); 
    } catch (error) {
      console.error("Gagal update avatar:", error);
      alert("Gagal mengupdate foto profil");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const triggerAvatarUpload = () => {
    avatarInputRef.current?.click();
  };

  return {
    user,
    fullName,
    onFullNameChange,
    username,
    onUsernameChange,
    currentPassword,
    onCurrentPasswordChange,
    newPassword,
    onNewPasswordChange,
    confirmPassword,
    onConfirmPasswordChange,
    showPasswordChange,
    setShowPasswordChange,
    isSaving,
    isAlertOpen,
    setIsAlertOpen,
    handleSave,
    // Avatar exports
    isUploadingAvatar,
    avatarInputRef,
    handleAvatarChange,
    triggerAvatarUpload,
  };
};

import { useSession } from '@/features/auth/hooks/useSession';
import useInput from '@/hooks/useInput';
import { updateAvatar } from '@/services/userService';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export const useSettingsState = () => {
  const { userData, refetchUser } = useSession();

  const [fullName, onFullNameChange] = useInput(userData?.data?.fullName);
  const [username, onUsernameChange] = useInput(userData?.data?.username);

  const [currentPassword, onCurrentPasswordChange] = useInput('');
  const [newPassword, onNewPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');

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
      await refetchUser();
      toast.success('Foto profil berhasil diperbarui');
    } catch (error: any) {
      console.error('Gagal update avatar:', error);
      toast.error(error.response?.data?.message || 'Gagal mengupdate foto profil');
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const triggerAvatarUpload = () => {
    avatarInputRef.current?.click();
  };

  return {
    user: userData?.data || null,
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

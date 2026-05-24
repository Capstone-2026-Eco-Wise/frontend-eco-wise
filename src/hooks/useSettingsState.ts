import { useSession } from "@/features/auth/hooks/useSession";
import useInput from "@/hooks/useInput";
import { updateAvatar, updateProfile, updatePassword } from "@/services/userService";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useSettingsState = () => {
  const { userData, refetchUser } = useSession();
  const navigate = useNavigate();

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
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | null>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let anyUpdated = false;

      if (selectedAvatarFile) {
        setIsUploadingAvatar(true);
        await updateAvatar(selectedAvatarFile);
        setSelectedAvatarFile(null);
        setIsUploadingAvatar(false);
        anyUpdated = true;
      }

      const finalFullName = fullName || userData?.data?.fullName;
      if (finalFullName && finalFullName !== userData?.data?.fullName) {
        await updateProfile(finalFullName);
        anyUpdated = true;
      }

      let passwordChanged = false;

      if (showPasswordChange) {
        if (!currentPassword || !newPassword || !confirmPassword) {
          toast.error("Semua kolom kata sandi wajib diisi");
          setIsSaving(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error("Konfirmasi kata sandi tidak cocok");
          setIsSaving(false);
          return;
        }
        await updatePassword({
          oldPassword: currentPassword,
          newPassword,
          confirmPassword,
        });
        setShowPasswordChange(false);
        passwordChanged = true;
      }

      if (passwordChanged) {
        localStorage.removeItem('accessToken');
        toast.info("Password telah dirubah, silakan login kembali");
        navigate("/login", { replace: true });
        return;
      }

      await refetchUser();
      setIsAlertOpen(true);
    } catch (error: any) {
      console.error("Gagal menyimpan pengaturan:", error);
      toast.error(
        error.response?.data?.message || "Gagal menyimpan perubahan",
      );
    } finally {
      setIsSaving(false);
      setIsUploadingAvatar(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedAvatarFile(file);
    setPreviewAvatarUrl(URL.createObjectURL(file));
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
    previewAvatarUrl,
  };
};

import {
  UserCircle,
  Mail,
  Camera,
  Key,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSettingsState } from "@/hooks/useSettingsState";

export default function PengaturanView() {
  const {
    user,
    onFullNameChange,
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
    // Avatar logic
    isUploadingAvatar,
    avatarInputRef,
    handleAvatarChange,
    triggerAvatarUpload,
    previewAvatarUrl,
    fullName,
  } = useSettingsState();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[#1e293b] dark:text-white mb-2 tracking-tight">
          Pengaturan Profil
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
          Kelola informasi pribadi dan preferensi akun Anda.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
        {/* Profile Header */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center gap-6">
          <div
            className="relative group cursor-pointer shrink-0"
            onClick={triggerAvatarUpload}
          >
            <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-50 dark:border-slate-800">
              {isUploadingAvatar ? (
                <Loader2 className="size-8 text-[#10b981] animate-spin" />
              ) : previewAvatarUrl || user?.avatar_url ? (
                <img
                  src={previewAvatarUrl || user?.avatar_url}
                  alt="Profile"
                  className="size-full object-cover"
                />
              ) : (
                <UserCircle className="size-24 text-slate-300 dark:text-slate-600 mt-4" />
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="size-6 text-white" />
            </div>
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#1e293b] dark:text-white mb-1">
              {user?.fullName}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center gap-1.5">
              <Mail className="size-4" />
              {user?.email}
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={fullName}
                onChange={onFullNameChange}
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all text-sm font-medium text-slate-800 dark:text-slate-100"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Nama Pengguna
              </label>
              <input
                type="text"
                defaultValue={user?.username}
                disabled
                className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 text-slate-550 dark:text-slate-400 text-sm font-medium cursor-not-allowed"
              />
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                Nama pengguna tidak dapat diubah.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Alamat Email
            </label>
            <input
              type="email"
              defaultValue={user?.email || ""}
              disabled
              className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/60 text-slate-550 dark:text-slate-400 text-sm font-medium cursor-not-allowed"
            />
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Email tidak dapat diubah setelah registrasi.
            </p>
          </div>

          {/* Password Change Section */}
          {showPasswordChange && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <h3 className="text-lg font-bold text-[#1e293b] dark:text-white flex items-center gap-2">
                <Lock className="size-5 text-[#10b981]" />
                Ubah Kata Sandi
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    Kata Sandi Saat Ini
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={onCurrentPasswordChange}
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all text-sm text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Kata Sandi Baru
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={onNewPasswordChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all text-sm text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      Konfirmasi Kata Sandi Baru
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={onConfirmPasswordChange}
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all text-sm text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-8 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {!showPasswordChange ? (
            <button
              onClick={() => setShowPasswordChange(true)}
              className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors w-full sm:w-auto justify-center"
            >
              <Key className="size-4" />
              Ubah Kata Sandi
            </button>
          ) : (
            <button
              onClick={() => setShowPasswordChange(false)}
              className="flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-650 transition-colors w-full sm:w-auto justify-center"
            >
              Batal Ubah Kata Sandi
            </button>
          )}

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-linear-to-r from-[#10b981] to-[#34d399] text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isSaving && <Loader2 className="size-4 animate-spin" />}
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent className="rounded-[32px] p-8 border-0 shadow-2xl max-w-md bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="size-16 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/30 flex items-center justify-center mb-2">
              <CheckCircle2 className="size-8 text-[#10b981]" />
            </div>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-extrabold text-[#1e293b] dark:text-white text-center">
                Sukses!
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-500 dark:text-slate-400 font-medium text-base text-center pt-2">
                Pengaturan profil Anda berhasil disimpan dan diperbarui.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="w-full sm:justify-center mt-6">
              <AlertDialogAction
                onClick={() => setIsAlertOpen(false)}
                className="w-full sm:w-auto px-8 py-6 rounded-full bg-[#10b981] text-white font-bold hover:bg-[#059669] hover:shadow-lg shadow-emerald-500/25 transition-all text-base"
              >
                Selesai
              </AlertDialogAction>
            </AlertDialogFooter>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

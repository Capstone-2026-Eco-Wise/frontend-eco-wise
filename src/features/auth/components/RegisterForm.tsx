import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type FormEvent, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdEmail, MdPerson } from 'react-icons/md';
import useInput from '../hooks/useInput';
import type { RegisterPayLoad } from '../types/auth';

interface RegisterFormProps {
  registerAction: (data: RegisterPayLoad) => Promise<void>;
}

export default function RegisterForm({ registerAction }: RegisterFormProps) {
  const [fullName, onFullNameChange] = useInput('');
  const [username, onUsernameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;
    // if (password !== confirmPassword) {
    //   alert("Password dan Confirm Password tidak sama");
    //   return;
    // }
    setLoading(true);
    try {
      await registerAction({
        full_name: fullName,
        email,
        password,
        username,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="mb-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
          Sign up to get started with EcoWise.
        </p>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="reg-name"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full name
        </Label>
        <div className="relative">
          <Input
            id="reg-name"
            type="text"
            placeholder="Your full name"
            value={fullName}
            onChange={onFullNameChange}
            required
            className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10 pl-3 rounded-xl text-sm focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
          />
          <MdPerson className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
        </div>
      </div>

      {/* Username */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="reg-username"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Username
        </Label>
        <div className="relative">
          <Input
            id="reg-username"
            type="text"
            placeholder="Your username"
            value={username}
            onChange={onUsernameChange}
            required
            className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10 pl-3 rounded-xl text-sm focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
          />
          <MdPerson className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="reg-email"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email address
        </Label>
        <div className="relative">
          <Input
            id="reg-email"
            type="email"
            placeholder="name@company.com"
            value={email}
            onChange={onEmailChange}
            required
            className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10 pl-3 rounded-xl text-sm focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
          />
          <MdEmail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 size-4 pointer-events-none" />
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="reg-password"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Password
        </Label>
        <div className="relative">
          <Input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={onPasswordChange}
            required
            className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10 pl-3 rounded-xl text-sm focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showPassword ? (
              <HiEyeOff className="size-4" />
            ) : (
              <HiEye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      {/* <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="reg-confirm-password"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Confirm password
        </Label>
        <div className="relative">
          <Input
            id="reg-confirm-password"
            type={showConfirm ? "text" : "password"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            required
            className="h-11 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-10 pl-3 rounded-xl text-sm focus-visible:ring-emerald-500 focus-visible:border-emerald-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {showConfirm ? (
              <HiEyeOff className="size-4" />
            ) : (
              <MdLock className="size-4" />
            )}
          </button>
        </div>
      </div> */}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl text-sm font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-md shadow-emerald-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  );
}

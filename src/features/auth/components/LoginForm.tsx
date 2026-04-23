import { type FormEvent, useState } from "react";
import { MdEmail } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import useInput from "../hooks/useInput";
import type { LoginPayLoad } from "../types/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface LoginFormProps {
  loginAction: (data: LoginPayLoad) => void;
}

export default function LoginForm({ loginAction }: LoginFormProps) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await Promise.resolve(loginAction({ email, password }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-5 w-full">
      {/* Header */}
      <div className="mb-1">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
          Please enter your details to sign in.
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="login-email"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email address
        </Label>
        <div className="relative">
          <Input
            id="login-email"
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
        <div className="flex items-center justify-between">
          <Label
            htmlFor="login-password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </Label>
          <button
            type="button"
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
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

      {/* Remember me */}
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="remember-me"
          checked={rememberMe}
          onCheckedChange={(val) => setRememberMe(val === true)}
          className="border-slate-300 data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
        />
        <Label
          htmlFor="remember-me"
          className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer font-normal"
        >
          Remember me for 30 days
        </Label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="h-11 w-full rounded-xl text-sm font-semibold text-white bg-linear-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 hover:to-teal-600 shadow-md shadow-emerald-500/30 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

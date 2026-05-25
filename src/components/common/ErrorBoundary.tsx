import React from 'react';
import { Leaf, RefreshCw } from 'lucide-react';

type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f4f7fb] dark:bg-slate-950 px-6 text-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="size-9 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md">
              <Leaf className="text-white size-5" />
            </div>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">EcoWise</span>
          </div>

          <div className="size-16 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Terjadi Kesalahan
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
              Mohon maaf, ada sesuatu yang tidak berjalan dengan baik. Silakan muat ulang halaman.
            </p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
          >
            <RefreshCw className="size-4" />
            Muat Ulang
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

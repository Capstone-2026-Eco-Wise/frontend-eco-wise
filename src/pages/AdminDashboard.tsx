import { useAuth } from "../contexts/AuthContext";

export default function AdminDashboard() {
  const { logoutState } = useAuth();

  return (
    <div className="p-4 bg-slate-900 text-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-emerald-400">Admin Dashboard</h1>
          <button
            onClick={logoutState}
            className="px-5 py-2.5 bg-red-500/10 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
        
        {/* Placeholder for admin content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
            <h3 className="text-slate-400 font-medium mb-2">Total Users</h3>
            <p className="text-3xl font-bold">1,248</p>
          </div>
          <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
            <h3 className="text-slate-400 font-medium mb-2">Active Challenges</h3>
            <p className="text-3xl font-bold">24</p>
          </div>
        </div>
      </div>
    </div>
  );
}

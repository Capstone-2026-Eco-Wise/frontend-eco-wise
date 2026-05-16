import {
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function AdminPenggunaView() {
  const mockUsers = [
    {
      id: "USR-001",
      name: "Budi Santoso",
      email: "budi@example.com",
      role: "User",
      status: "Active",
      joinDate: "12 Mei 2026",
    },
    {
      id: "USR-002",
      name: "Siti Aminah",
      email: "siti@example.com",
      role: "User",
      status: "Active",
      joinDate: "14 Mei 2026",
    },
    {
      id: "USR-003",
      name: "Admin Utama",
      email: "admin@ecowise.com",
      role: "Admin",
      status: "Active",
      joinDate: "1 Jan 2026",
    },
    {
      id: "USR-004",
      name: "Joko Anwar",
      email: "joko@example.com",
      role: "User",
      status: "Suspended",
      joinDate: "10 Apr 2026",
    },
    {
      id: "USR-005",
      name: "Rina Melati",
      email: "rina@example.com",
      role: "User",
      status: "Active",
      joinDate: "15 Mei 2026",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-[#1e293b] mb-2 tracking-tight">
            Manajemen Pengguna
          </h1>
          <p className="text-slate-500 font-medium text-base">
            Kelola data pengguna, perbarui peran, dan pantau aktivitas akun.
          </p>
        </div>
        <button className="px-6 py-3 rounded-full bg-linear-to-r from-emerald-600 to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap">
          + Tambah Pengguna
        </button>
      </div>

      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              className="w-full h-11 pl-11 pr-4 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-sm font-bold hover:bg-slate-50 hover:text-emerald-600 transition-colors w-full sm:w-auto justify-center">
            <Filter className="size-4" />
            Filter Status
          </button>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">ID Pengguna</th>
                <th className="px-6 py-4">Informasi Akun</th>
                <th className="px-6 py-4">Peran</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Bergabung</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
                      {user.id}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-[#1e293b] mb-0.5">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-slate-500">
                      {user.email}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        user.role === "Admin"
                          ? "bg-purple-50 text-purple-600 border border-purple-100"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      {user.status === "Active" ? (
                        <>
                          <CheckCircle2 className="size-4 text-emerald-500" />
                          <span className="text-sm font-bold text-emerald-600">
                            Aktif
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="size-4 text-red-500" />
                          <span className="text-sm font-bold text-red-600">
                            Ditangguhkan
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-slate-600">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                        title="Hapus"
                      >
                        <Trash2 className="size-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"
                        title="Opsi Lain"
                      >
                        <MoreVertical className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between text-sm font-medium text-slate-500 bg-slate-50/30">
          <p>Menampilkan 1 hingga 5 dari 5 pengguna</p>
          <div className="flex gap-2">
            <button
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              Sebelumnya
            </button>
            <button
              className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

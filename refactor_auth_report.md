# Laporan Perbaikan & Refactoring (Branch `refactor/auth`)

Laporan ini merangkum seluruh perubahan arsitektur, perbaikan logika, dan penambahan fitur antarmuka yang telah diselesaikan pada branch `refactor/auth` untuk menyesuaikan fitur autentikasi dengan dokumentasi API dan memperbaiki hak akses (*role-based access*).

## 1. Migrasi State Management (Penghapusan `AuthContext`)
- **Masalah Sebelumnya**: Adanya redundansi *state* dan *bug* sinkronisasi karena penggunaan `AuthContext` yang mencoba mencadangkan data profil pengguna di `localStorage`.
- **Solusi**: `AuthContext` beserta *provider*-nya di `main.tsx` telah **dihapus sepenuhnya**. Aplikasi kini menggunakan pola *Single Source of Truth* melalui hook `useSession.tsx` yang mengambil data sesi langsung dari *backend* API secara *real-time*.
- **Keuntungan**: Lebih aman (data sensitif tidak disimpan di `localStorage`), mencegah data usang (*stale data*), dan kode menjadi jauh lebih ringan.

## 2. Penyempurnaan Hak Akses & *Routing*
- **Perbaikan Destructuring API**: Memperbaiki *bug* pada `authApi.ts` di mana objek *response login* dipecah terlalu dalam, menyebabkan atribut `role` pengguna terbaca sebagai `undefined`. Sekarang, `getRedirectPath` bisa membaca peran `user` atau `admin` dengan sempurna.
- **Pembaruan Route Guards**: `PublicRoute.tsx` dan `ProtectedRoute.tsx` telah dimigrasikan untuk menggunakan `useSession`. 
- **Loading State**: Ditambahkan status `isLoading` pada `useSession` agar aplikasi menunggu hingga pemanggilan API selesai sebelum melakukan navigasi, sehingga menghilangkan *glitch* (kedipan antarmuka halaman login sesaat) pada rute yang dilindungi.

## 3. Ekstraksi *Business Logic* (Reusable Forms)
- **Login & Register Refactoring**: Logika pemanggilan API dipisahkan ke dalam *Custom Hooks* independen (`useLogin.ts` dan `useRegister.ts`).
- **Keuntungan**: Komponen antarmuka `LoginForm.tsx` dan `RegisterForm.tsx` kini murni berfungsi sebagai UI (*plug-and-play*) tanpa harus menerima fungsi *action* dari luar komponen. Ini membuat form lebih mudah dites dan didaur ulang.

## 4. Modernisasi *User Experience* (UX)
- **Penghapusan Alert Kuno**: Menghapus seluruh peringatan standar peramban (`alert()`) yang memblokir layar pada halaman Registrasi dan Pengaturan.
- **Integrasi Sonner**: Menggantinya dengan notifikasi *toast* modern yang elegan (`toast.success` dan `toast.error`) untuk memberikan umpan balik yang konsisten dan ramah pengguna.
- **Perbaikan Praktik SPA**: Menghapus penggunaan `window.location.reload()` pada `useSettingsState.ts` saat pengguna mengunggah foto profil. Diganti dengan pemanggilan `refetchUser()` dari `useSession` sehingga foto pada *header* langsung diperbarui secara instan tanpa memuat ulang tab.

## 5. Penyeragaman Penanganan Error API
- **Perbaikan Tangkapan Kesalahan**: Mengaudit ulang blok `catch` pada layanan utama (`useEcoPoints.ts`, `useScanHistory.ts`, `useDailyTasks.ts`).
- **Keuntungan**: Kode sekarang diprioritaskan untuk membaca pesan *error* langsung dari *backend* (`err.response?.data?.message`). Ini menghindari pesan *error* teknis bawaan Axios (seperti *"Request failed with status code 400"*) muncul ke pengguna akhir.

## 6. Pembuatan Arsitektur Admin Dashboard
- **Nested Routing**: Mengubah `AdminDashboard.tsx` menjadi *Layout Wrapper* (menggunakan `<Outlet />`), menyerupai arsitektur `UserDashboard`.
- **Admin Beranda (`/admin`)**: Membangun tampilan beranda yang memukau dengan *Stat Cards* interaktif, *placeholder* grafik, dan *timeline* aktivitas sistem.
- **Manajemen Pengguna (`/admin/pengguna`)**: Membangun halaman antarmuka tabel data berkelas enterprise yang dilengkapi bilah pencarian, *badge* status, dan deretan opsi aksi (*hover actions*).

---

> [!NOTE]
> Semua fitur telah di-push dengan susunan kode yang lebih bersih, pemisahan tanggung jawab (*Separation of Concerns*) yang ketat, dan siap di-*merge* ke branch utama (seperti `dev` atau `main`). Tidak ada lagi perombakan arsitektur besar yang diperlukan untuk modul Autentikasi.

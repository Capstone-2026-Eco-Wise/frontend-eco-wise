# 🍃 EcoWise - Frontend Application

EcoWise adalah platform web interaktif dan tergamifikasi yang dirancang untuk membantu pengguna membangun kebiasaan ramah lingkungan dan mempraktikkan gaya hidup berkelanjutan. Melalui sistem pelacakan sampah, misi harian, papan peringkat (leaderboard), dan panel admin yang komprehensif, EcoWise mendorong aksi nyata untuk menjaga kelestarian bumi.

---

## ✨ Fitur Utama

### 👤 Fitur Pengguna (User Dashboard)

- **Beranda (Overview)**: Memantau ringkasan poin, peringkat, serta statistik performa aktivitas ramah lingkungan secara real-time.
- **Pemindai Sampah (Waste Scanner)**: Mengunggah atau mengambil gambar sampah menggunakan kamera untuk diidentifikasi kategorinya agar dapat dipilah secara tepat.
- **Riwayat Aktivitas**:
  - **Riwayat Scan**: Catatan pemindaian sampah yang telah dilakukan.
  - **Riwayat Misi**: Daftar misi ramah lingkungan yang berhasil diselesaikan beserta perolehan poinnya.
- **Papan Peringkat (Leaderboard)**: Menampilkan peringkat pengguna teratas berdasarkan akumulasi Eco Points untuk memotivasi kompetisi positif.
- **Pengaturan Profil**: Mengelola detail informasi akun dan preferensi aplikasi.

### 🔑 Fitur Admin (Admin Dashboard)

- **Beranda Admin**: Monitoring ringkasan statistik platform, jumlah pengguna aktif, misi yang diselesaikan, dan grafik tren aktivitas.
- **Manajemen Pengguna**: Melihat, memverifikasi, serta mengelola data pengguna platform.
- **Manajemen Misi Harian (Daily Tasks)**: Menambahkan, memperbarui, atau menonaktifkan misi harian ramah lingkungan.
- **Manajemen Kategori Sampah**: Mengatur kategori sampah untuk sistem pemindai (organik, anorganik, B3, dll.).
- **Manajemen FAQ**: Mengelola artikel bantuan dan tanya-jawab umum untuk memudahkan pengguna.
- **Pengaturan Sistem**: Penyesuaian konfigurasi platform.

---

## 🛠️ Stack Teknologi

Berikut adalah teknologi utama yang digunakan dalam pengembangan aplikasi frontend ini:

| Teknologi                | Deskripsi                                                                     |
| :----------------------- | :---------------------------------------------------------------------------- |
| **React 19**             | Library UI utama dengan performa rendering yang optimal.                      |
| **Vite 8**               | Build tool super cepat untuk pengembangan frontend modern.                    |
| **TypeScript 6**         | Menghadirkan static typing untuk kode yang lebih aman dan terstruktur.        |
| **Tailwind CSS v4**      | Framework utilitas CSS terbaru untuk styling cepat, responsif, dan konsisten. |
| **React Router DOM v7**  | Routing aplikasi client-side, mendukung dynamic & nested routing.             |
| **Axios**                | HTTP client untuk melakukan komunikasi data dengan Backend API.               |
| **Base UI & Radix UI**   | Komponen UI tanpa gaya (headless components) untuk aksesibilitas tinggi.      |
| **Shadcn UI**            | Komponen UI siap pakai yang fully customizable dan accessible.                |
| **Lucide & React Icons** | Kumpulan ikon modern beresolusi tinggi.                                       |
| **Sonner**               | Library notifikasi/toast yang interaktif dan beranimasi mulus.                |

---

## ⚙️ Persyaratan Sistem

Sebelum menjalankan proyek ini di lingkungan lokal Anda, pastikan Anda telah menginstal tools berikut:

- **Node.js** (versi 18.x atau lebih baru direkomendasikan)
- **npm** (biasanya disertakan bersama instalasi Node.js) atau **yarn** / **pnpm**

---

## 🚀 Langkah Instalasi & Menjalankan Aplikasi

Ikuti langkah-langkah di bawah ini untuk menyiapkan lingkungan pengembangan lokal Anda:

### 1. Masuk ke Direktori Proyek

Buka terminal Anda dan masuk ke folder frontend proyek EcoWise:

```bash
cd "frontend-eco-wise"
```

### 2. Instal Dependensi Proyek

Unduh dan pasang semua paket library yang dibutuhkan:

```bash
npm install
```

### 3. Konfigurasi Environment Variables

Salin berkas template `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Setelah disalin, buka file `.env` di text editor Anda dan lengkapi nilai variabelnya:

```env
VITE_API_URL="http://localhost:3000/api"
VITE_API_KEY="masukkan_api_key_anda_disini"
```

_Catatan: Sesuaikan `VITE_API_URL` dengan alamat port server backend EcoWise Anda._

### 4. Jalankan Server Pengembangan

Jalankan aplikasi dalam mode development:

```bash
npm run dev
```

Setelah server berjalan, Anda dapat mengakses aplikasi melalui peramban (browser) di alamat yang tertera di terminal, biasanya `http://localhost:5173`.

---

## 📦 Perintah NPM yang Tersedia

Berikut adalah daftar script npm yang dapat digunakan dalam proyek ini:

- `npm run dev`: Menjalankan local development server menggunakan Vite.
- `npm run build`: Melakukan kompilasi TypeScript (`tsc`) dan melakukan bundling kode ke folder `dist` untuk kebutuhan produksi.
- `npm run preview`: Menjalankan server lokal untuk meninjau hasil build produksi secara lokal.
- `npm run lint`: Menjalankan ESLint untuk mengecek kualitas dan kesesuaian standar kode TypeScript/React.

---

## 📁 Struktur Folder Proyek

```text
frontend-eco-wise/
├── public/                 # Aset statis publik (ikon, gambar publik)
├── src/
│   ├── assets/             # Media dan gambar lokal (diimpor di kode)
│   ├── components/         # Komponen UI global (common, UI, layout)
│   ├── constants/          # Nilai statis/konstanta global
│   ├── features/           # Pembagian modul berbasis fitur (domain-driven)
│   │   ├── admin/          # Fitur khusus panel admin
│   │   ├── auth/           # Fitur otentikasi (login, register)
│   │   ├── landing/        # Fitur untuk halaman beranda utama
│   │   └── user/           # Fitur untuk dashboard pengguna
│   ├── hooks/              # Custom hooks React reusable
│   ├── lib/                # Integrasi library pihak ketiga (utils, axios, dll.)
│   ├── pages/              # Halaman tingkat tinggi (views/layouts)
│   ├── routes/             # Proteksi rute (ProtectedRoute, PublicRoute)
│   ├── services/           # Service API calls (komunikasi dengan backend)
│   ├── styles/             # Pengaturan stylesheet & Tailwind
│   ├── App.tsx             # Pengaturan routing utama aplikasi
│   └── main.tsx            # Entry point aplikasi React
├── .env.example            # Template variabel lingkungan
├── eslint.config.js        # Konfigurasi ESLint
├── vite.config.ts          # Konfigurasi bundler Vite
└── tsconfig.json           # Konfigurasi TypeScript compiler
```

# Panduan Penggunaan Zod & React Hook Form (Shadcn UI)

Zod berfungsi sebagai "Buku Aturan" (Skema Validasi) untuk memastikan form diisi dengan benar sebelum data dikirim ke backend. Dibandingkan dengan React konvensional yang menggunakan banyak `useState` dan kondisi `if-else` manual, Zod membuat validasi menjadi jauh lebih bersih dan terpusat.

## Langkah 1: Instalasi Library

Pastikan Anda sudah menginstal library yang dibutuhkan:

```bash
npm install react-hook-form @hookform/resolvers zod
```

## Langkah 2: Pembuatan Skema (Schema)

Buatlah file terpisah untuk menyimpan aturan validasi agar modular dan bisa dipakai berulang kali. (Contoh diletakkan di `src/features/auth/schemas/authSchema.ts`):

```typescript
import { z } from "zod";

// Skema untuk Login
export const loginSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  password: z.string().min(1, { message: "Password wajib diisi" }),
});

// Skema untuk Register (contoh dengan pengecekan password ganda)
export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "Nama minimal 2 karakter" }),
    email: z.string().email({ message: "Format email tidak valid" }),
    password: z.string().min(6, { message: "Password minimal 6 karakter" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"], // Menentukan di baris mana notifikasi error akan muncul
  });
```

## Langkah 3: Menghubungkan Zod dengan React Form

Di dalam komponen UI (Misal `RegisterForm.tsx`), kita panggil fungsi `useForm` dari React Hook Form, lalu masukkan skema Zod kita dengan bantuan `zodResolver`:

```tsx
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/authSchema";

export default function RegisterForm() {
  // 1. Setup Form Hook
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Setup Submit Handler (Hanya akan tereksekusi jika lolos rintangan Zod)
  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log("Data Lolos Validasi Zod:", values);
    // Jalankan fungsi backend API di sini...
  }
}
```

## Langkah 4: Tampilan TSX (Shadcn)

Kaitkan objek `form` ke komponen UI agar jika ada eror, ia muncul secara otomatis tanpa harus divalidasi manual di dalam return TSX.

_Catatan: Anda wajib menggunakan komponen bawaan `<Form>`, `<FormField>`, dan `<FormMessage>` dari Shadcn untuk merasakan otomatisasinya._

**Contoh tampilan TSX-nya:**

```tsx
return (
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Kolom Email */}
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="user@example.com" {...field} />
            </FormControl>
            <FormMessage />{" "}
            {/* Peringatan dari Zod akan otomatis muncul di sini */}
          </FormItem>
        )}
      />

      <Button type="submit">Submit</Button>
    </form>
  </Form>
);
```

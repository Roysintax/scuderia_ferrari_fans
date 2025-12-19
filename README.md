# 🏎️ Scuderia Ferrari Fans Website Clone

![Project Status](https://img.shields.io/badge/status-active-red.svg)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20Vite-blue.svg)
![Backend](https://img.shields.io/badge/backend-Express%20%2B%20MySQL-green.svg)
![Styling](https://img.shields.io/badge/styling-Tailwind%20CSS-38bdf8.svg)

**Scuderia Ferrari Fans** adalah aplikasi web *full-stack* yang komprehensif, dirancang untuk memberikan pengalaman digital mendalam bagi para penggemar Formula 1 Ferrari. Proyek ini terdiri dari portal publik yang modern, panel admin untuk manajemen konten, dan backend RESTful API yang kuat.

---

## 📂 Struktur Proyek

Proyek ini menggunakan arsitektur *monorepo* dengan tiga bagian utama:

1.  **Frontend (Root):** Halaman utama untuk pengguna (Fans), dibangun dengan React & Tailwind CSS.
2.  **Admin Panel (`/admin`):** Dashboard khusus untuk mengelola data, dibangun dengan React & TypeScript.
3.  **Backend Server (`/server`):** REST API yang melayani data ke frontend, dibangun dengan Express & MySQL.

---

## ✨ Fitur Utama

* **Antarmuka Modern:** Desain responsif dengan animasi halus menggunakan Framer Motion dan Embla Carousel.
* **Komponen UI Kaya:** Menggunakan **Radix UI** (Accordion, Dialog, Popover, dll) untuk aksesibilitas dan interaksi yang solid.
* **Visualisasi Data:** Grafik statistik menggunakan `recharts`.
* **Manajemen Konten:** Admin panel terdedikasi untuk mengelola berita, pembalap, dan jadwal balapan.
* **Database Relasional:** Penyimpanan data terstruktur menggunakan MySQL.

---

## 🛠️ Teknologi yang Digunakan

### 🖥️ Frontend (User Interface)
* **Core:** React 18, Vite
* **Styling:** Tailwind CSS, Class Variance Authority (CVA)
* **Components:** Radix UI Primitives (Headless UI), Lucide React (Icons)
* **Utils:** React Hook Form, Sonner (Toast notifications), Next Themes

### ⚙️ Admin Panel
* **Core:** React 18, TypeScript, Vite
* **Routing:** React Router DOM
* **Icons:** Lucide React

### 🗄️ Backend API
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MySQL (via `mysql2`)
* **Utilities:** Dotenv, CORS, Nodemon

---

## 🚀 Panduan Instalasi (Getting Started)

Ikuti langkah-langkah berikut untuk menjalankan proyek ini secara lokal:

### 1. Prasyarat
Pastikan Anda telah menginstal:
* Node.js & npm
* MySQL Server

### 2. Setup Database
1.  Buat database baru di MySQL (misalnya: `f1pages`).
2.  Import file `f1pages.sql` (jika tersedia di root folder) ke dalam database tersebut.
3.  Pastikan konfigurasi di `server/db.js` atau `.env` sesuai dengan kredensial MySQL Anda.

### 3. Instalasi & Jalankan Server (Backend)
```bash
cd server
npm install
npm run dev

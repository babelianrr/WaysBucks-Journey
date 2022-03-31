# WaysBucks
Rilisan awal untuk proyek WaysBucks oleh babelianrr. Saya telah memperbaiki kode-kode untuk meningkatkan kualitas proyek ini walaupun masih terdapat beberapa bug.

## Memulai
- Unduh repo ke perangkat anda.
- Jalankan `npm install` untuk mengunduh paket dependensi.
- Impor `waysbucks.sql` ke phpMyAdmin.
  - Jangan lupa untuk mengkonfigurasi database di `server/config/config.json`
  - Kredensial admin adalah:
    ```
    "email": "admin@tbc.net",
    "password": "123456"
    ```
  - Kredensial user adalah:
    ```
    "email": "bayupks@tbc.net",
    "password": "123456"
    ```
- Pindah ke folder `server` lalu jalankan perintah `npm run dev` untuk menjalankan aplikasi.
- Anda juga dapat menjalankan backend saja untuk mengetes API, cukup pindah ke folder `server` lalu jalankan perintah `npm start`.
  - Rute-rute API dapat ditemukan di `server/src/routes/index.js`.
  - Jalankan API menggunakan Postman atau Thunder Client.

### Apa yang dapat pengguna lakukan:
- Mendaftar dan masuk.
- Membuat transaksi.
- Melihat profil dan sejarah transaksi.

### Apa yang dapat admin lakukan:
- Melihat dan mengatur transaksi
- Menambah, memperbarui, dan menghapus produk.
- Fitur Dashboard untuk melihat jumlah pengguna, jumlah transaksi, dan estimasi pendapatan (fitur yang belum selesai)

### Bug yang diketahui
- Ketika mengganti bahasa lalu berpindah ke halaman lain, dropdown pemilihan bahasa berubah kembali ke Bahasa Inggris walau bahasa tetap sama (untuk mengubah bahasa kembali ke bahasa Inggris, klik bahasa yang sedang ditampilkan lalu klik bahasa Inggris lagi).
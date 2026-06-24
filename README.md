# AR Business Card – Andronikus Pardamean Sihotang
## Panduan Lengkap Setup & Penggunaan

---

## 📁 Struktur Folder Proyek

Setelah semua file disiapkan, struktur folder Anda harus terlihat seperti ini:

```
arweek12/
│
├── index.html                    ← File utama (sudah dibuat)
│
├── assets/
│   ├── markers/
│   │   └── marker.patt           ← ⬅ FILE MARKER CUSTOM ANDA (download dari generator)
│   │
│   ├── models/
│   │   └── card_model.glb        ← ⬅ FILE MODEL 3D ANDA (download dari Sketchfab dll.)
│   │
│   └── images/
│       ├── profile.jpg           ← ⬅ FOTO PROFIL ANDA (ganti dengan foto asli)
│       └── profile_placeholder.png  ← Fallback jika foto tidak ada
│
└── README.md                     ← File panduan ini
```

---

## 🎯 Langkah 1 — Membuat & Menyimpan Custom Marker (.patt)

### Cara Membuat File `.patt`:
1. Buka generator marker AR.js:
   **https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html**
2. Klik **"Upload"** dan pilih gambar hitam-putih dengan kontras tinggi (logo, simbol, huruf tebal)
3. Atur **Pattern Ratio** ke sekitar **0.5** (default sudah bagus)
4. Klik **"Download Marker"** → Anda akan mendapat file `.patt`
5. **Simpan file `.patt` di:**
   ```
   arweek12/assets/markers/marker.patt
   ```
6. Pastikan nama file di `index.html` baris ini cocok:
   ```html
   url="assets/markers/marker.patt"
   ```

### Tips Gambar Marker yang Bagus:
- Gunakan gambar **hitam-putih** (bukan abu-abu)
- Kontras **sangat tinggi** (border gelap di atas background terang)
- Ukuran minimal **512×512px**
- Sertakan **border putih** di sekeliling gambar agar AR.js bisa mendeteksinya
- **Hindari** gambar yang terlalu simetris (sulit dilacak arahnya)

### Mencetak Marker:
- Print gambar marker di kertas putih
- Ukuran cetak minimal **6×6 cm** agar kamera laptop bisa membacanya

---

## 🎨 Langkah 2 — Menyiapkan Model 3D GLB

### Sumber Model GLB Gratis + Beranimasi:
| Situs | URL | Filter |
|---|---|---|
| Sketchfab | https://sketchfab.com | Animated + Free + GLB |
| Poly Pizza | https://poly.pizza | Free |
| Google Poly (arsip) | https://poly.google.com | - |
| Kenney | https://kenney.nl | Free |

### Rekomendasi Model untuk Business Card AR:
- Crystal / hologram 3D
- Badge / trofi 3D yang berputar
- Laptop mini animasi
- Logo kampus 3D (jika tersedia)

### Cara Menyimpan Model:
1. Download model dengan format **GLB** (bukan GLTF terpisah, bukan FBX)
2. Letakkan file di:
   ```
   arweek12/assets/models/card_model.glb
   ```
3. Pastikan nama di `index.html` cocok:
   ```html
   src="assets/models/card_model.glb"
   ```

---

## ⚙️ Langkah 3 — Pengaturan Animasi Model GLB

Di dalam `index.html`, animasi model GLB dikendalikan oleh dua hal:

### A. Animasi Internal GLB (dari Blender/3D software)
```html
animation-mixer="clip: *; loop: repeat; crossFadeDuration: 0.4; timeScale: 1.0;"
```
| Parameter | Penjelasan |
|---|---|
| `clip: *` | Jalankan **semua** animasi clip yang ada di file GLB |
| `clip: NamaClip` | Jalankan clip tertentu saja (lihat nama clip di Blender) |
| `loop: repeat` | Ulangi terus-menerus (looping) |
| `loop: once` | Jalankan sekali saja |
| `crossFadeDuration: 0.4` | Transisi antar clip (detik) |
| `timeScale: 1.0` | Kecepatan animasi (2.0 = 2x lebih cepat) |

### B. Animasi Float (Efek Melayang — dari A-Frame)
```html
animation__float="property: position; from: 0 0.05 0; to: 0 0.25 0;
                  dur: 2000; dir: alternate; loop: true; easing: easeInOutSine;"
```
Ini membuat model naik-turun secara halus, **terpisah** dari animasi internal GLB.

### C. Animasi Rotasi Lambat
```html
animation__spin="property: rotation; from: 0 0 0; to: 0 360 0;
                 dur: 12000; loop: true; easing: linear;"
```
Model berputar 360° setiap 12 detik.

### Jika animasi tidak berjalan:
1. Pastikan file GLB memang memiliki animasi (buka di https://gltf-viewer.donmccurdy.com/ untuk cek)
2. Cek console browser (F12) untuk error loading
3. Ganti `clip: *` dengan nama clip spesifik yang terlihat di viewer

---

## 🖼️ Langkah 4 — Menyiapkan Foto Profil

1. Ambil foto Anda (format **JPG** atau **PNG**)
2. Rename menjadi `profile.jpg`
3. Letakkan di:
   ```
   arweek12/assets/images/profile.jpg
   ```
4. **Ukuran rekomendasi**: 300×300px (persegi) agar tampil bagus di lingkaran AR

---

## 🌐 Langkah 5 — Menjalankan Server Lokal (WAJIB)

> ⚠️ **KRITIS**: Browser **tidak mengizinkan akses kamera** jika file dibuka langsung dengan `file://...`.
> Anda **WAJIB** menggunakan server lokal (`http://localhost`).

### Opsi A — Python (Paling Mudah, Tanpa Install)
Buka Terminal/PowerShell di folder `arweek12`:
```powershell
# Python 3 (cek dengan: python --version)
python -m http.server 8080

# Python 2 (jika python 3 tidak ada)
python -m SimpleHTTPServer 8080
```
Buka browser → **http://localhost:8080**

### Opsi B — Node.js (via npx, tanpa install global)
```powershell
npx serve .
```
Buka browser → **http://localhost:3000**

### Opsi C — VS Code Live Server Extension
1. Install ekstensi **Live Server** di VS Code
2. Klik kanan `index.html` → **"Open with Live Server"**
3. Browser otomatis terbuka di `http://127.0.0.1:5500`

### Opsi D — Node.js http-server
```powershell
npx http-server . -p 8080 --cors
```

### ✅ Izin Kamera di Browser
Saat browser meminta akses kamera, klik **"Izinkan"** / **"Allow"**.
Jika tidak muncul, pastikan URL menggunakan `http://localhost` (bukan `file://`).

---

## 🔧 Konfigurasi Lanjutan

### Mengubah Ukuran & Posisi Elemen AR
Edit nilai `position`, `scale`, `rotation` pada masing-masing `<a-entity>` di `index.html`:
```html
<!-- Koordinat: X (kiri-kanan), Y (atas-bawah), Z (depan-belakang) -->
position="0 0.5 0"   <!-- Tengah horizontal, 0.5m di atas marker -->
scale="0.5 0.5 0.5"  <!-- Setengah ukuran asli model -->
```

### Mengubah Kecepatan Float
Ubah nilai `dur` (durasi dalam milidetik):
- `dur: 1500` → lebih cepat naik-turun
- `dur: 3000` → lebih lambat & dramatis

### Menggunakan Preset Marker Hiro (untuk Testing)
Jika marker custom belum siap, ubah baris marker di `index.html`:
```html
<!-- GANTI INI (marker custom): -->
<a-marker type="pattern" url="assets/markers/marker.patt" ...>

<!-- JADI INI (marker Hiro bawaan): -->
<a-marker preset="hiro" ...>
```
Download gambar marker Hiro di: https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg

---

## 🔗 Update Link Social Media

Buka `index.html` dan cari bagian `id="social-overlay"`, ubah `href` masing-masing tombol:

```html
<!-- LinkedIn -->
<a href="https://linkedin.com/in/USERNAME-ANDA" ...>

<!-- GitHub -->
<a href="https://github.com/USERNAME-ANDA" ...>

<!-- Instagram -->
<a href="https://instagram.com/USERNAME-ANDA" ...>

<!-- Portfolio -->
<a href="https://DOMAIN-PORTFOLIO-ANDA.com" ...>
```

---

## 🐛 Troubleshooting

| Masalah | Solusi |
|---|---|
| Kamera tidak bisa diakses | Gunakan `http://localhost` bukan `file://` |
| Marker tidak terdeteksi | Print lebih besar (min 8×8cm), pencahayaan cukup |
| Model GLB tidak muncul | Cek path file, buka F12 console untuk error |
| Animasi tidak jalan | Pastikan file GLB berisi animasi, cek nama clip |
| Layar hitam | Izinkan akses kamera di browser |
| Error CORS | Tambahkan `--cors` di command server, atau gunakan Live Server |

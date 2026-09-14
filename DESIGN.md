# Design Direction: latihdirixls

## Identity
latihdirixls adalah platform web latihan interaktif Microsoft Excel komprehensif, cepat, tanpa login, dan berorientasi pada kepraktisan kerja nyata. Identitas visualnya mengangkat estetika lembar kerja modern: fungsional, presisi, bersih, dan berorientasi pada produktivitas data.

Dial: ENERGY 2 / RHYTHM 2 / MOTION 1

## Personality
- Presisi dan terstruktur seperti software spreadsheet profesional.
- Ramah dan mudah dipahami dalam penjelasan dwibahasa (ID/EN).
- Jujur dan transparan: bebas dari klaim berlebihan dan statistik palsu.

## Palette
Menggunakan palet inti terfokus (2-3 warna inti + 1 aksen) dengan kontras tinggi sesuai standar WCAG AA (>= 4.5:1):

### Mode Terang (Light Mode)
- Base Background: `#F8FAFC` (Slate 50, nyaman di mata untuk sesi belajar panjang)
- Surface / Card: `#FFFFFF` (Putih murni untuk kontras sel lembar kerja)
- Primary Brand: `#107C41` (Excel Forest Green klasik, melambangkan keaslian spreadsheet)
- Primary Brand Hover: `#0D6535` (Lebih pekat untuk feedback interaksi)
- Border / Grid Lines: `#CBD5E1` (Slate 300, pembatas sel yang tegas dan rapi)
- Heading & Text: `#0F172A` (Slate 900, rasio kontras 14:1 terhadap putih)
- Muted Text: `#475569` (Slate 600, rasio kontras 5.8:1 terhadap putih, melampaui standar 4.5:1)
- Accent Focus: `#D97706` (Amber 600, aksen aktif pada formula bar dan status kalkulasi)
- Success State: `#15803D` (Green 700 dengan teks `#14532D` dan badge `#DCFCE7`)
- Error State: `#B91C1C` (Red 700 dengan teks `#7F1D1D` dan badge `#FEE2E2`)

### Mode Gelap (Dark Mode)
- Base Background: `#0B1120` (Slate 950 pekat dan elegan)
- Surface / Card: `#1E293B` (Slate 800 untuk panel dan tabel)
- Primary Brand: `#22C55E` (Green 500, kontras tinggi di atas latar gelap)
- Primary Brand Hover: `#16A34A`
- Border / Grid Lines: `#334155` (Slate 700)
- Heading & Text: `#F8FAFC` (Slate 50, kontras sangat tinggi)
- Muted Text: `#94A3B8` (Slate 400, rasio kontras 6.2:1 terhadap `#1E293B`)
- Accent Focus: `#F59E0B` (Amber 500)
- Success State: `#4ADE80` (Green 400)
- Error State: `#F87171` (Red 400)

## Typography
- Antarmuka & Konten: Font sistem sans-serif modern (`Inter`, system-ui, -apple-system, Segoe UI) dengan rendering tabular numbers (`font-variant-numeric: tabular-nums`) untuk perataan angka spreadsheet yang sempurna.
- Formula Bar & Sel Kode: Font monospace berjarak tetap (`JetBrains Mono`, `Consolas`, `Monaco`, monospace) agar kurung, referensi sel, dan operator terbaca jelas.

## Visual Hierarchy & Rhythm
- Layout utama terbagi menjadi 2 area kerja: Panel Penjelasan & Soal di sisi kiri, serta Grid Lembar Kerja & Formula Bar di sisi kanan (atau bertumpuk proporsional pada layar mobile).
- Formula bar diletakkan tepat di atas grid dengan simbol fx dan indikator sel aktif.
- Radius border konsisten: sudut sedang (8px / `rounded-lg`) pada kontainer kartu dan modal, sudut kecil (4px / `rounded`) pada sel dan tombol kontrol. Tidak ada bentuk pil generik pada kartu atau input.
- Bayangan selektif: hanya digunakan sebagai penanda elevasi pada dropdown menu, modal dialog, dan sertifikat digital.

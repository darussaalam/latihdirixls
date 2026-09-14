import { ShortcutItem } from '../types';

export const SHORTCUTS_DATA: ShortcutItem[] = [
  // 1. Navigation
  {
    id: 'nav-arrows',
    category: 'navigation',
    title: {
      id: 'Pindah ke Ujung Data Region',
      en: 'Jump to Edge of Data Region',
    },
    description: {
      id: 'Melompat langsung ke sel terisi paling ujung pada arah panah tanpa perlu scroll berulang kali.',
      en: 'Jump directly to the outermost populated cell in the arrow direction without scrolling.',
    },
    keysWindows: ['Ctrl', 'Panah'],
    keysMac: ['Cmd', 'Panah'],
    importance: 'essential',
    exampleUsage: {
      id: 'Tekan Ctrl + Panah Bawah untuk langsung ke baris transaksi terakhir.',
      en: 'Press Ctrl + Down Arrow to jump straight to the last transaction row.',
    },
  },
  {
    id: 'nav-home',
    category: 'navigation',
    title: {
      id: 'Kembali ke Sel A1 (Awal Lembar Kerja)',
      en: 'Return to Cell A1 (Top of Worksheet)',
    },
    description: {
      id: 'Memindahkan fokus aktif langsung ke sel A1 dari posisi manapun di sheet.',
      en: 'Moves active selection directly to cell A1 from anywhere in the worksheet.',
    },
    keysWindows: ['Ctrl', 'Home'],
    keysMac: ['Fn', 'Cmd', 'Panah Kiri'],
    importance: 'essential',
    exampleUsage: {
      id: 'Tekan setelah memeriksa tabel besar di baris ribuan untuk kembali ke judul laporan.',
      en: 'Press after reviewing deep rows to jump back to report header.',
    },
  },
  {
    id: 'nav-end',
    category: 'navigation',
    title: {
      id: 'Pindah ke Sel Aktif Paling Bawah Kanan',
      en: 'Jump to Last Used Cell',
    },
    description: {
      id: 'Pindah seketika ke sel terkanan dan terbawah yang pernah digunakan.',
      en: 'Move immediately to the bottom-rightmost used cell in the sheet.',
    },
    keysWindows: ['Ctrl', 'End'],
    keysMac: ['Fn', 'Cmd', 'Panah Kanan'],
    importance: 'essential',
    exampleUsage: {
      id: 'Mendeteksi batas riil data untuk memastikan tidak ada spasi kosong tak terlihat.',
      en: 'Detect actual boundary of worksheet data to spot hidden trailing entries.',
    },
  },
  {
    id: 'nav-next-sheet',
    category: 'navigation',
    title: {
      id: 'Pindah ke Lembar Kerja Berikutnya',
      en: 'Switch to Next Worksheet',
    },
    description: {
      id: 'Berpindah tab sheet ke arah kanan secara instan tanpa mengklik mouse.',
      en: 'Switch to the worksheet tab on the right immediately without clicking.',
    },
    keysWindows: ['Ctrl', 'Page Down'],
    keysMac: ['Fn', 'Cmd', 'Panah Bawah'],
    importance: 'essential',
    exampleUsage: {
      id: 'Navigasi cepat antar sheet bulanan (Januari, Februari, Maret).',
      en: 'Quickly cycle through monthly sheets (January, February, March).',
    },
  },
  {
    id: 'nav-prev-sheet',
    category: 'navigation',
    title: {
      id: 'Pindah ke Lembar Kerja Sebelumnya',
      en: 'Switch to Previous Worksheet',
    },
    description: {
      id: 'Berpindah tab sheet ke arah kiri secara instan.',
      en: 'Switch to the worksheet tab on the left immediately.',
    },
    keysWindows: ['Ctrl', 'Page Up'],
    keysMac: ['Fn', 'Cmd', 'Panah Atas'],
    importance: 'essential',
    exampleUsage: {
      id: 'Kembali ke tab rekap utama dari tab detail.',
      en: 'Return to summary tab from detailed breakdown sheet.',
    },
  },

  // 2. Selection
  {
    id: 'sel-all-data',
    category: 'selection',
    title: {
      id: 'Pilih Seluruh Wilayah Data Terhubung',
      en: 'Select Current Data Region',
    },
    description: {
      id: 'Memilih seluruh blok tabel data yang saling terhubung (Current Region).',
      en: 'Selects the entire connected block of data cells (Current Region).',
    },
    keysWindows: ['Ctrl', 'A'],
    keysMac: ['Cmd', 'A'],
    importance: 'essential',
    exampleUsage: {
      id: 'Klik salah satu sel di dalam tabel penjualan, lalu tekan Ctrl + A.',
      en: 'Click any cell inside a table, then press Ctrl + A to highlight table only.',
    },
  },
  {
    id: 'sel-row',
    category: 'selection',
    title: {
      id: 'Pilih Seluruh Baris Mendatar',
      en: 'Select Entire Row',
    },
    description: {
      id: 'Memblok seluruh baris horizontal dari kolom A sampai kolom terakhir.',
      en: 'Select the entire horizontal row from column A to the sheet end.',
    },
    keysWindows: ['Shift', 'Spasi'],
    keysMac: ['Shift', 'Spasi'],
    importance: 'essential',
    exampleUsage: {
      id: 'Gunakan bersama Ctrl + tanda minus (-) untuk menghapus satu baris seketika.',
      en: 'Use together with Ctrl + minus (-) to delete an entire row immediately.',
    },
  },
  {
    id: 'sel-col',
    category: 'selection',
    title: {
      id: 'Pilih Seluruh Kolom Tegak',
      en: 'Select Entire Column',
    },
    description: {
      id: 'Memblok seluruh kolom vertikal dari baris 1 sampai baris terakhir.',
      en: 'Select the entire vertical column from row 1 to bottom.',
    },
    keysWindows: ['Ctrl', 'Spasi'],
    keysMac: ['Ctrl', 'Spasi'],
    importance: 'essential',
    exampleUsage: {
      id: 'Memformat mata uang atau merapikan lebar satu kolom penuh sekaligus.',
      en: 'Format currency or adjust column width across all rows at once.',
    },
  },
  {
    id: 'sel-range-end',
    category: 'selection',
    title: {
      id: 'Blok Rentang Sampai Ujung Data',
      en: 'Extend Selection to Edge of Data',
    },
    description: {
      id: 'Memilih dan memblok sel mulai dari posisi aktif hingga data paling ujung.',
      en: 'Extends cell selection from active cell to the edge of current block.',
    },
    keysWindows: ['Ctrl', 'Shift', 'Panah'],
    keysMac: ['Cmd', 'Shift', 'Panah'],
    importance: 'essential',
    exampleUsage: {
      id: 'Blok kolom nilai dari C2 ke bawah dengan Ctrl + Shift + Panah Bawah.',
      en: 'Highlight values from C2 downward with Ctrl + Shift + Down Arrow.',
    },
  },

  // 3. Formulas & Calculation
  {
    id: 'formula-autosum',
    category: 'formulas',
    title: {
      id: 'AutoSum Otomatis',
      en: 'AutoSum Quick Insert',
    },
    description: {
      id: 'Memasukkan rumus SUM otomatis untuk deretan angka di atas atau di sebelah kiri sel.',
      en: 'Instantly generates a SUM formula for numbers directly above or to the left.',
    },
    keysWindows: ['Alt', '='],
    keysMac: ['Cmd', 'Shift', 'T'],
    importance: 'essential',
    exampleUsage: {
      id: 'Posisikan kursor di bawah kolom angka, tekan Alt + = lalu tekan Enter.',
      en: 'Place cursor under a column of numbers, press Alt + = and press Enter.',
    },
  },
  {
    id: 'formula-toggle-absolute',
    category: 'formulas',
    title: {
      id: 'Kunci Referensi Sel Absolut ($)',
      en: 'Toggle Absolute Cell Reference ($)',
    },
    description: {
      id: 'Mengubah tipe referensi sel secara bergantian: A1 -> $A$1 -> A$1 -> $A1 -> A1.',
      en: 'Cycles through reference modes: A1 -> $A$1 -> A$1 -> $A1 -> A1.',
    },
    keysWindows: ['F4'],
    keysMac: ['Cmd', 'T'],
    importance: 'essential',
    exampleUsage: {
      id: 'Saat menulis rumus perkalian dengan tarif pajak di sel B1, tekan F4 untuk mengunci sel $B$1.',
      en: 'When referencing a fixed tax rate in cell B1, press F4 to anchor as $B$1.',
    },
  },
  {
    id: 'formula-show-all',
    category: 'formulas',
    title: {
      id: 'Tampilkan / Sembunyikan Semua Rumus',
      en: 'Toggle Display Formulas',
    },
    description: {
      id: 'Beralih antara menampilkan nilai hasil atau teks rumus asli di seluruh sel lembar kerja.',
      en: 'Toggles between displaying formula results and actual formula syntax.',
    },
    keysWindows: ['Ctrl', '`'],
    keysMac: ['Ctrl', '`'],
    importance: 'essential',
    exampleUsage: {
      id: 'Gunakan saat memeriksa konsistensi rumus di seluruh tabel laporan keuangan.',
      en: 'Use to audit formula integrity across a complex financial table.',
    },
  },
  {
    id: 'formula-insert-dialog',
    category: 'formulas',
    title: {
      id: 'Buka Jendela Dialog Fungsi (fx)',
      en: 'Open Insert Function Dialog (fx)',
    },
    description: {
      id: 'Membuka jendela pencarian dan panduan argumen fungsi formula Excel.',
      en: 'Opens the Insert Function dialog to search and configure formula arguments.',
    },
    keysWindows: ['Shift', 'F3'],
    keysMac: ['Shift', 'F3'],
    importance: 'advanced',
    exampleUsage: {
      id: 'Membantu mengisi argumen fungsi rumit seperti XLOOKUP atau PMT.',
      en: 'Assists in setting parameters for complex formulas like XLOOKUP or PMT.',
    },
  },

  // 4. Formatting
  {
    id: 'fmt-dialog',
    category: 'formatting',
    title: {
      id: 'Buka Kotak Dialog Format Cells',
      en: 'Open Format Cells Dialog',
    },
    description: {
      id: 'Membuka menu lengkap pengaturan format angka, perataan, font, border, dan fill.',
      en: 'Opens the comprehensive Format Cells modal for numbers, alignment, borders, and fills.',
    },
    keysWindows: ['Ctrl', '1'],
    keysMac: ['Cmd', '1'],
    importance: 'essential',
    exampleUsage: {
      id: 'Pintasan tercepat untuk kustomisasi format tanggal atau desimal khusus.',
      en: 'Fastest shortcut to customize dates or custom decimal alignments.',
    },
  },
  {
    id: 'fmt-currency',
    category: 'formatting',
    title: {
      id: 'Format Mata Uang Cepat',
      en: 'Apply Currency Format',
    },
    description: {
      id: 'Menerapkan format mata uang standar dengan pemisah ribuan dan dua angka desimal.',
      en: 'Applies standard currency formatting with thousand separators.',
    },
    keysWindows: ['Ctrl', 'Shift', '$'],
    keysMac: ['Ctrl', 'Shift', '$'],
    importance: 'essential',
    exampleUsage: {
      id: 'Mengubah angka mentah 50000 menjadi format uang secara instan.',
      en: 'Converts raw number 50000 into clean financial figures.',
    },
  },
  {
    id: 'fmt-percent',
    category: 'formatting',
    title: {
      id: 'Format Persentase Cepat',
      en: 'Apply Percentage Format',
    },
    description: {
      id: 'Menerapkan format persen (%) tanpa tempat desimal.',
      en: 'Applies percentage formatting with no decimal places.',
    },
    keysWindows: ['Ctrl', 'Shift', '%'],
    keysMac: ['Ctrl', 'Shift', '%'],
    importance: 'essential',
    exampleUsage: {
      id: 'Mengubah nilai 0.15 menjadi 15% secara instan.',
      en: 'Transforms decimal value 0.15 into 15% instantly.',
    },
  },
  {
    id: 'fmt-date',
    category: 'formatting',
    title: {
      id: 'Format Tanggal Singkat (DD-MMM-YY)',
      en: 'Apply Date Format',
    },
    description: {
      id: 'Mengubah angka serial menjadi format tanggal kalender.',
      en: 'Converts Excel serial number into legible calendar date format.',
    },
    keysWindows: ['Ctrl', 'Shift', '#'],
    keysMac: ['Ctrl', 'Shift', '#'],
    importance: 'essential',
    exampleUsage: {
      id: 'Mengatasi angka serial seperti 45320 agar terbaca sebagai tanggal yang rapi.',
      en: 'Corrects numeric serial codes into proper dates.',
    },
  },
  {
    id: 'fmt-bold',
    category: 'formatting',
    title: {
      id: 'Tebalkan Huruf (Bold)',
      en: 'Toggle Bold Style',
    },
    description: {
      id: 'Mengaktifkan atau menonaktifkan cetak tebal pada sel yang dipilih.',
      en: 'Applies or removes bold styling to active selection.',
    },
    keysWindows: ['Ctrl', 'B'],
    keysMac: ['Cmd', 'B'],
    importance: 'essential',
    exampleUsage: {
      id: 'Menonjolkan header kolom dan baris total.',
      en: 'Emphasize table headers and summary total rows.',
    },
  },

  // 5. Editing
  {
    id: 'edit-fill-down',
    category: 'editing',
    title: {
      id: 'Salin Sel ke Bawah (Fill Down)',
      en: 'Fill Down from Cell Above',
    },
    description: {
      id: 'Menyalin rumus atau nilai dari sel tepat di atasnya ke sel yang dipilih.',
      en: 'Copies formula or contents from cell directly above into selected cells.',
    },
    keysWindows: ['Ctrl', 'D'],
    keysMac: ['Cmd', 'D'],
    importance: 'essential',
    exampleUsage: {
      id: 'Blok dari C2 sampai C20, tekan Ctrl + D untuk menduplikasi rumus C2 ke bawah.',
      en: 'Highlight C2 through C20, press Ctrl + D to propagate formula downward.',
    },
  },
  {
    id: 'edit-fill-right',
    category: 'editing',
    title: {
      id: 'Salin Sel ke Kanan (Fill Right)',
      en: 'Fill Right from Cell on Left',
    },
    description: {
      id: 'Menyalin rumus atau nilai dari sel di sebelah kirinya.',
      en: 'Copies contents from cell immediately to the left.',
    },
    keysWindows: ['Ctrl', 'R'],
    keysMac: ['Cmd', 'R'],
    importance: 'essential',
    exampleUsage: {
      id: 'Menyalin rumus total bulanan ke kolom bulan berikutnya.',
      en: 'Propagate monthly totals horizontally across adjacent columns.',
    },
  },
  {
    id: 'edit-flash-fill',
    category: 'editing',
    title: {
      id: 'Isi Cerdas Otomatis (Flash Fill)',
      en: 'Flash Fill Pattern Recognition',
    },
    description: {
      id: 'Excel secara otomatis mengenali pola pemisahan nama/kode dan mengisinya untuk semua baris.',
      en: 'Detects patterns and automatically fills data down the column.',
    },
    keysWindows: ['Ctrl', 'E'],
    keysMac: ['Cmd', 'E'],
    importance: 'essential',
    exampleUsage: {
      id: 'Ketik nama depan di baris pertama, tekan Ctrl + E untuk memisahkan seluruh nama otomatis.',
      en: 'Type first name in row 1, hit Ctrl + E to extract all first names instantly.',
    },
  },
  {
    id: 'edit-insert-cells',
    category: 'editing',
    title: {
      id: 'Sisipkan Baris / Kolom Baru',
      en: 'Insert New Row or Column',
    },
    description: {
      id: 'Membuka menu dialog untuk menyisipkan sel, baris, atau kolom baru.',
      en: 'Opens dialog to insert new cells, rows, or columns.',
    },
    keysWindows: ['Ctrl', 'Shift', '+'],
    keysMac: ['Cmd', 'Shift', '+'],
    importance: 'essential',
    exampleUsage: {
      id: 'Pilih baris dengan Shift + Spasi, lalu tekan Ctrl + Shift + + untuk menyisipkan baris.',
      en: 'Select row with Shift + Space, then hit Ctrl + Shift + + to insert row above.',
    },
  },
  {
    id: 'edit-delete-cells',
    category: 'editing',
    title: {
      id: 'Hapus Baris / Kolom Terpilih',
      en: 'Delete Selected Row or Column',
    },
    description: {
      id: 'Menghapus sel, baris utuh, atau kolom utuh yang sedang diblok.',
      en: 'Deletes currently highlighted cells, rows, or columns.',
    },
    keysWindows: ['Ctrl', '-'],
    keysMac: ['Cmd', '-'],
    importance: 'essential',
    exampleUsage: {
      id: 'Blok baris kosong yang tidak diperlukan lalu tekan Ctrl + - untuk menghapusnya.',
      en: 'Highlight redundant rows and press Ctrl + - to remove them cleanly.',
    },
  },
  {
    id: 'edit-create-table',
    category: 'editing',
    title: {
      id: 'Ubah Data Menjadi Excel Table Resmi',
      en: 'Convert Data to Official Excel Table',
    },
    description: {
      id: 'Mengubah rentang data biasa menjadi tabel terstruktur lengkap dengan filter dan format otomatis.',
      en: 'Transforms ordinary range into a structured Excel table with auto-filter.',
    },
    keysWindows: ['Ctrl', 'T'],
    keysMac: ['Cmd', 'T'],
    importance: 'essential',
    exampleUsage: {
      id: 'Letakkan kursor di dalam tabel, tekan Ctrl + T lalu tekan Enter.',
      en: 'Place cursor inside data range, press Ctrl + T and confirm with Enter.',
    },
  },

  // 6. General & File
  {
    id: 'gen-save',
    category: 'general',
    title: {
      id: 'Simpan Lembar Kerja (Save)',
      en: 'Save Workbook',
    },
    description: {
      id: 'Menyimpan berkas yang sedang aktif untuk menghindari kehilangan data.',
      en: 'Saves the current active workbook file to disk.',
    },
    keysWindows: ['Ctrl', 'S'],
    keysMac: ['Cmd', 'S'],
    importance: 'essential',
    exampleUsage: {
      id: 'Lakukan secara berkala saat menyelesaikan tiap bagian tabel kerja.',
      en: 'Run routinely while building financial sheets.',
    },
  },
  {
    id: 'gen-undo',
    category: 'general',
    title: {
      id: 'Batalkan Tindakan (Undo)',
      en: 'Undo Last Action',
    },
    description: {
      id: 'Membatalkan satu atau beberapa langkah perubahan terakhir.',
      en: 'Reverts the most recent modification.',
    },
    keysWindows: ['Ctrl', 'Z'],
    keysMac: ['Cmd', 'Z'],
    importance: 'essential',
    exampleUsage: {
      id: 'Mengembalikan data jika tidak sengaja terhapus atau tertimpa.',
      en: 'Recover accidentally cleared cell contents.',
    },
  },
  {
    id: 'gen-redo',
    category: 'general',
    title: {
      id: 'Ulangi Tindakan (Redo)',
      en: 'Redo Last Action',
    },
    description: {
      id: 'Mengulang kembali tindakan yang baru saja dibatalkan oleh Undo.',
      en: 'Re-applies the action that was just undone.',
    },
    keysWindows: ['Ctrl', 'Y'],
    keysMac: ['Cmd', 'Y'],
    importance: 'essential',
    exampleUsage: {
      id: 'Mengembalikan perubahan setelah memeriksa riwayat undo.',
      en: 'Restore changes after inspecting previous state.',
    },
  },
];

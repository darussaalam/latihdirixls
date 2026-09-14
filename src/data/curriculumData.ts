import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  // ==========================================
  // LEVEL 1: DASAR (BASIC)
  // ==========================================
  {
    id: 'basic-1',
    level: 'basic',
    order: 1,
    category: {
      id: 'Operasi Aritmatika',
      en: 'Arithmetic Operations',
    },
    title: {
      id: 'Perkalian Dasar: Menghitung Subtotal Penjualan',
      en: 'Basic Multiplication: Calculating Sales Subtotal',
    },
    concept: {
      id: 'Di Excel, setiap rumus selalu diawali dengan tanda sama dengan (=). Untuk mengalikan dua sel, gunakan operator bintang (*). Contohnya, mengalikan jumlah barang di sel B2 dengan harga satuan di sel C2 ditulis =B2*C2.',
      en: 'In Excel, every formula begins with an equals sign (=). To multiply two cells, use the asterisk operator (*). For example, multiplying quantity in B2 by unit price in C2 is written as =B2*C2.',
    },
    syntax: {
      id: '=SelA * SelB',
      en: '=CellA * CellB',
    },
    formulaExample: '=B2*C2',
    scenario: {
      id: 'Toko Buku Cerdas ingin menghitung subtotal penjualan Buku Catatan. Jumlah terjual adalah 15 buah dan harga satuan Rp 12.000.',
      en: 'Cerdas Bookstore needs to calculate the subtotal for Notebook sales. Quantity sold is 15 units at a unit price of 12,000.',
    },
    taskInstruction: {
      id: 'Klik sel D2, lalu ketik rumus untuk mengalikan Jumlah (B2) dengan Harga (C2).',
      en: 'Select cell D2, then enter a formula to multiply Quantity (B2) by Price (C2).',
    },
    targetCell: 'D2',
    expectedResult: 180000,
    expectedFormulaSample: '=B2*C2',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D'],
      rowCount: 4,
      cells: {
        A1: { value: 'Nama Barang', format: 'text', isReadOnly: true },
        B1: { value: 'Jumlah (Qty)', format: 'text', isReadOnly: true },
        C1: { value: 'Harga Satuan', format: 'text', isReadOnly: true },
        D1: { value: 'Subtotal', format: 'text', isReadOnly: true },
        A2: { value: 'Buku Catatan', format: 'text', isReadOnly: true },
        B2: { value: 15, format: 'number', isReadOnly: true },
        C2: { value: 12000, format: 'currency', isReadOnly: true },
        D2: { value: '', format: 'currency' },
        A3: { value: 'Pulpen Gel', format: 'text', isReadOnly: true },
        B3: { value: 20, format: 'number', isReadOnly: true },
        C3: { value: 5000, format: 'currency', isReadOnly: true },
        D3: { value: 100000, format: 'currency', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Gunakan tanda sama dengan (=) diikuti alamat sel B2, tanda bintang (*), dan sel C2.',
          en: 'Start with (=) followed by cell address B2, asterisk (*), and cell C2.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur rumus: =B2*C2',
          en: 'Formula structure: =B2*C2',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik persis =B2*C2 pada formula bar lalu tekan tombol Periksa Rumus.',
          en: 'Enter exactly =B2*C2 in the formula bar and click Check Formula.',
        },
      },
    ],
  },
  {
    id: 'basic-2',
    level: 'basic',
    order: 2,
    category: {
      id: 'Operasi Aritmatika',
      en: 'Arithmetic Operations',
    },
    title: {
      id: 'Pengurangan: Menghitung Keuntungan Bersih',
      en: 'Subtraction: Calculating Net Profit',
    },
    concept: {
      id: 'Pengurangan di Excel menggunakan tanda minus (-). Keuntungan bersih diperoleh dengan mengurangkan total pengeluaran (biaya) dari total pendapatan yang diterima.',
      en: 'Subtraction in Excel uses the standard minus sign (-). Net profit is determined by subtracting total expenses from total revenue.',
    },
    syntax: {
      id: '=Pendapatan - Biaya',
      en: '=Revenue - Expenses',
    },
    formulaExample: '=B2-C2',
    scenario: {
      id: 'Laporan keuangan kedai kopi mencatat Pendapatan di sel B2 sebesar Rp 45.000.000 dan Pengeluaran di sel C2 sebesar Rp 28.500.000.',
      en: 'Coffee shop statement shows Revenue in cell B2 as 45,000,000 and Expenses in cell C2 as 28,500,000.',
    },
    taskInstruction: {
      id: 'Hitung laba bersih pada sel D2 dengan mengurangkan Pendapatan (B2) dengan Pengeluaran (C2).',
      en: 'Calculate net profit in cell D2 by subtracting Expenses (C2) from Revenue (B2).',
    },
    targetCell: 'D2',
    expectedResult: 16500000,
    expectedFormulaSample: '=B2-C2',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D'],
      rowCount: 3,
      cells: {
        A1: { value: 'Bulan', format: 'text', isReadOnly: true },
        B1: { value: 'Pendapatan', format: 'text', isReadOnly: true },
        C1: { value: 'Pengeluaran', format: 'text', isReadOnly: true },
        D1: { value: 'Laba Bersih', format: 'text', isReadOnly: true },
        A2: { value: 'Januari', format: 'text', isReadOnly: true },
        B2: { value: 45000000, format: 'currency', isReadOnly: true },
        C2: { value: 28500000, format: 'currency', isReadOnly: true },
        D2: { value: '', format: 'currency' },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Kurangkan sel B2 dengan sel C2.',
          en: 'Subtract cell C2 from cell B2.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Rumus dimulai dengan =B2 lalu gunakan tanda minus (-).',
          en: 'Start formula with =B2 followed by minus (-).',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =B2-C2 pada sel D2.',
          en: 'Type =B2-C2 into cell D2.',
        },
      },
    ],
  },
  {
    id: 'basic-3',
    level: 'basic',
    order: 3,
    category: {
      id: 'Fungsi Agregasi',
      en: 'Aggregation Functions',
    },
    title: {
      id: 'Fungsi SUM: Menjumlahkan Deretan Data',
      en: 'SUM Function: Totaling a Data Range',
    },
    concept: {
      id: 'Fungsi SUM adalah cara tercepat untuk menjumlahkan sekumpulan angka dalam rentang sel. Alih-alih menulis =B2+B3+B4+B5, gunakan tanda titik dua (:) untuk rentang: =SUM(B2:B5).',
      en: 'The SUM function totals a sequence of numeric cells. Instead of =B2+B3+B4+B5, use a colon (:) for contiguous ranges: =SUM(B2:B5).',
    },
    syntax: {
      id: '=SUM(SelAwal:SelAkhir)',
      en: '=SUM(StartCell:EndCell)',
    },
    formulaExample: '=SUM(B2:B5)',
    scenario: {
      id: 'Terdapat data penjualan mingguan dari Hari Senin (B2) hingga Jumat (B6). Kita membutuhkan total keseluruhan penjualan mingguan pada sel B7.',
      en: 'We have daily sales figures from Monday (B2) through Friday (B6). We need the total weekly sales figure in cell B7.',
    },
    taskInstruction: {
      id: 'Di sel B7, masukkan rumus SUM untuk menjumlahkan nilai dari sel B2 sampai B6.',
      en: 'In cell B7, enter the SUM function to aggregate values from B2 through B6.',
    },
    targetCell: 'B7',
    expectedResult: 1750000,
    expectedFormulaSample: '=SUM(B2:B6)',
    initialGrid: {
      columns: ['A', 'B'],
      rowCount: 8,
      cells: {
        A1: { value: 'Hari', format: 'text', isReadOnly: true },
        B1: { value: 'Penjualan', format: 'text', isReadOnly: true },
        A2: { value: 'Senin', format: 'text', isReadOnly: true },
        B2: { value: 350000, format: 'currency', isReadOnly: true },
        A3: { value: 'Selasa', format: 'text', isReadOnly: true },
        B3: { value: 400000, format: 'currency', isReadOnly: true },
        A4: { value: 'Rabu', format: 'text', isReadOnly: true },
        B4: { value: 250000, format: 'currency', isReadOnly: true },
        A5: { value: 'Kamis', format: 'text', isReadOnly: true },
        B5: { value: 300000, format: 'currency', isReadOnly: true },
        A6: { value: 'Jumat', format: 'text', isReadOnly: true },
        B6: { value: 450000, format: 'currency', isReadOnly: true },
        A7: { value: 'Total Penjualan', format: 'text', isReadOnly: true },
        B7: { value: '', format: 'currency' },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Gunakan fungsi SUM dengan kurung buka, lalu masukkan rentang sel B2:B6.',
          en: 'Use SUM with parentheses containing range B2:B6.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Bentuk rumus: =SUM(B2:B6)',
          en: 'Formula pattern: =SUM(B2:B6)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =SUM(B2:B6) pada sel B7.',
          en: 'Type =SUM(B2:B6) into cell B7.',
        },
      },
    ],
  },
  {
    id: 'basic-4',
    level: 'basic',
    order: 4,
    category: {
      id: 'Fungsi Agregasi',
      en: 'Aggregation Functions',
    },
    title: {
      id: 'Fungsi AVERAGE: Menghitung Nilai Rata-Rata',
      en: 'AVERAGE Function: Calculating the Mean Value',
    },
    concept: {
      id: 'Fungsi AVERAGE menghitung nilai rerata aritmatika dari sekumpulan data angka. Sel kosong tidak akan dihitung dalam pembagi, menjaga keakuratan hasil.',
      en: 'The AVERAGE function calculates the arithmetic mean of numbers in a range. Empty cells are excluded from division to preserve accuracy.',
    },
    syntax: {
      id: '=AVERAGE(SelAwal:SelAkhir)',
      en: '=AVERAGE(StartCell:EndCell)',
    },
    formulaExample: '=AVERAGE(C2:C6)',
    scenario: {
      id: 'Guru ingin mengetahui nilai rata-rata ujian matematika kelas dari 5 orang siswa yang tercantum pada sel C2 sampai C6.',
      en: 'Instructor needs the average math test score across 5 students listed in cells C2 through C6.',
    },
    taskInstruction: {
      id: 'Ketik rumus AVERAGE di sel C7 untuk menghitung nilai rata-rata dari rentang C2:C6.',
      en: 'Enter AVERAGE formula in cell C7 to find the mean score of range C2:C6.',
    },
    targetCell: 'C7',
    expectedResult: 84,
    expectedFormulaSample: '=AVERAGE(C2:C6)',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 8,
      cells: {
        A1: { value: 'No', format: 'text', isReadOnly: true },
        B1: { value: 'Nama Siswa', format: 'text', isReadOnly: true },
        C1: { value: 'Nilai Ujian', format: 'text', isReadOnly: true },
        A2: { value: 1, format: 'number', isReadOnly: true },
        B2: { value: 'Andi', format: 'text', isReadOnly: true },
        C2: { value: 80, format: 'number', isReadOnly: true },
        A3: { value: 2, format: 'number', isReadOnly: true },
        B3: { value: 'Budi', format: 'text', isReadOnly: true },
        C3: { value: 90, format: 'number', isReadOnly: true },
        A4: { value: 3, format: 'number', isReadOnly: true },
        B4: { value: 'Citra', format: 'text', isReadOnly: true },
        C4: { value: 75, format: 'number', isReadOnly: true },
        A5: { value: 4, format: 'number', isReadOnly: true },
        B5: { value: 'Dewi', format: 'text', isReadOnly: true },
        C5: { value: 95, format: 'number', isReadOnly: true },
        A6: { value: 5, format: 'number', isReadOnly: true },
        B6: { value: 'Eko', format: 'text', isReadOnly: true },
        C6: { value: 80, format: 'number', isReadOnly: true },
        A7: { value: '', format: 'text', isReadOnly: true },
        B7: { value: 'Rata-Rata', format: 'text', isReadOnly: true },
        C7: { value: '', format: 'number' },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Gunakan fungsi AVERAGE untuk rentang C2 hingga C6.',
          en: 'Use AVERAGE function for range C2 to C6.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur rumus: =AVERAGE(C2:C6)',
          en: 'Formula structure: =AVERAGE(C2:C6)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Tulis =AVERAGE(C2:C6) pada sel C7.',
          en: 'Write =AVERAGE(C2:C6) in cell C7.',
        },
      },
    ],
  },
  {
    id: 'basic-5',
    level: 'basic',
    order: 5,
    category: {
      id: 'Pencacah Data',
      en: 'Counting Functions',
    },
    title: {
      id: 'Fungsi COUNT vs COUNTA: Menghitung Jumlah Data',
      en: 'COUNT vs COUNTA: Counting Cells with Data',
    },
    concept: {
      id: 'COUNT hanya menghitung sel yang memuat angka, sedangkan COUNTA menghitung semua sel yang tidak kosong (angka maupun teks). Untuk menghitung jumlah peserta terdaftar (teks), gunakan COUNTA.',
      en: 'COUNT only tallies cells containing numbers, while COUNTA counts all non-empty cells (both text and numbers). To count participant names, use COUNTA.',
    },
    syntax: {
      id: '=COUNTA(RentangSel)',
      en: '=COUNTA(CellRange)',
    },
    formulaExample: '=COUNTA(B2:B7)',
    scenario: {
      id: 'Koordinator acara ingin menghitung berapa banyak nama peserta yang sudah terdaftar pada kolom B (sel B2 sampai B7).',
      en: 'Event organizer needs to count total registered participant names listed in column B (cells B2 to B7).',
    },
    taskInstruction: {
      id: 'Di sel B8, gunakan rumus COUNTA untuk menghitung banyaknya peserta pada rentang B2:B7.',
      en: 'In cell B8, use the COUNTA formula to count participants in range B2:B7.',
    },
    targetCell: 'B8',
    expectedResult: 6,
    expectedFormulaSample: '=COUNTA(B2:B7)',
    initialGrid: {
      columns: ['A', 'B'],
      rowCount: 9,
      cells: {
        A1: { value: 'ID', format: 'text', isReadOnly: true },
        B1: { value: 'Nama Peserta', format: 'text', isReadOnly: true },
        A2: { value: 'P01', format: 'text', isReadOnly: true },
        B2: { value: 'Siti Aminah', format: 'text', isReadOnly: true },
        A3: { value: 'P02', format: 'text', isReadOnly: true },
        B3: { value: 'Rian Pratama', format: 'text', isReadOnly: true },
        A4: { value: 'P03', format: 'text', isReadOnly: true },
        B4: { value: 'Doni Firmansyah', format: 'text', isReadOnly: true },
        A5: { value: 'P04', format: 'text', isReadOnly: true },
        B5: { value: 'Ayu Lestari', format: 'text', isReadOnly: true },
        A6: { value: 'P05', format: 'text', isReadOnly: true },
        B6: { value: 'Hendra Wijaya', format: 'text', isReadOnly: true },
        A7: { value: 'P06', format: 'text', isReadOnly: true },
        B7: { value: 'Mega Utami', format: 'text', isReadOnly: true },
        A8: { value: 'Total Peserta', format: 'text', isReadOnly: true },
        B8: { value: '', format: 'number' },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Karena datanya berupa teks nama, gunakan COUNTA, bukan COUNT.',
          en: 'Because the entries are text names, use COUNTA rather than COUNT.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Rumus: =COUNTA(B2:B7)',
          en: 'Formula: =COUNTA(B2:B7)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =COUNTA(B2:B7) pada sel B8.',
          en: 'Type =COUNTA(B2:B7) into cell B8.',
        },
      },
    ],
  },
  {
    id: 'basic-6',
    level: 'basic',
    order: 6,
    category: {
      id: 'Referensi Sel',
      en: 'Cell References',
    },
    title: {
      id: 'Referensi Absolut: Menghitung Pajak dengan Tanda Dollar ($)',
      en: 'Absolute Reference: Calculating Tax with Dollar Signs ($)',
    },
    concept: {
      id: 'Saat rumus disalin ke sel lain, referensi relatif seperti B3 akan otomatis bergeser. Agar sel tarif acuan (misal tarif PPN di sel D1) tidak bergeser saat rumus digandakan, kita menguncinya dengan tanda dollar: $D$1.',
      en: 'When copying formulas, relative references shift automatically. To fix an anchor cell like a tax rate in D1, lock it with dollar signs: $D$1.',
    },
    syntax: {
      id: '=SelNilai * $Kolom$Baris',
      en: '=ValueCell * $Column$Row',
    },
    formulaExample: '=B3*$D$1',
    scenario: {
      id: 'Tarif PPN 11% tersimpan di sel D1 (0.11). Kita ingin menghitung nominal pajak untuk produk di baris 3 (sel B3 = Rp 1.000.000).',
      en: 'VAT rate 11% is stored in cell D1 (0.11). We need to calculate tax amount for product in row 3 (cell B3 = 1,000,000).',
    },
    taskInstruction: {
      id: 'Di sel C3, ketik rumus perkalian antara Nilai Barang (B3) dengan Tarif PPN absolut ($D$1).',
      en: 'In cell C3, enter a formula multiplying Item Value (B3) by absolute Tax Rate ($D$1).',
    },
    targetCell: 'C3',
    expectedResult: 110000,
    expectedFormulaSample: '=B3*$D$1',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D'],
      rowCount: 5,
      cells: {
        A1: { value: 'Tarif PPN:', format: 'text', isReadOnly: true },
        B1: { value: '', format: 'text', isReadOnly: true },
        C1: { value: '', format: 'text', isReadOnly: true },
        D1: { value: 0.11, format: 'percent', isReadOnly: true },
        A2: { value: 'Produk', format: 'text', isReadOnly: true },
        B2: { value: 'Harga Bersih', format: 'text', isReadOnly: true },
        C2: { value: 'Nominal Pajak', format: 'text', isReadOnly: true },
        D2: { value: '', format: 'text', isReadOnly: true },
        A3: { value: 'Meja Kerja', format: 'text', isReadOnly: true },
        B3: { value: 1000000, format: 'currency', isReadOnly: true },
        C3: { value: '', format: 'currency' },
        D3: { value: '', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Kalikan sel B3 dengan sel D1 yang dikunci tanda dollar $D$1.',
          en: 'Multiply cell B3 by cell D1 locked with dollar signs $D$1.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur rumus: =B3*$D$1',
          en: 'Formula structure: =B3*$D$1',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =B3*$D$1 pada sel C3.',
          en: 'Enter =B3*$D$1 into cell C3.',
        },
      },
    ],
  },

  // ==========================================
  // LEVEL 2: MENENGAH (INTERMEDIATE)
  // ==========================================
  {
    id: 'inter-1',
    level: 'intermediate',
    order: 1,
    category: {
      id: 'Fungsi Logika',
      en: 'Logical Functions',
    },
    title: {
      id: 'Fungsi IF: Menentukan Status Kelulusan Berdasarkan Nilai',
      en: 'IF Function: Determining Pass/Fail Status Based on Score',
    },
    concept: {
      id: 'Fungsi IF mengevaluasi suatu kondisi pengujian. Jika kondisi terpenuhi (TRUE), rumus mengembalikan nilai pertama. Jika tidak (FALSE), rumus mengembalikan nilai kedua.',
      en: 'The IF function evaluates a test condition. If true, it returns the first value; otherwise, it outputs the alternative value.',
    },
    syntax: {
      id: '=IF(Kondisi, NilaiJikaBenar, NilaiJikaSalah)',
      en: '=IF(Condition, ValueIfTrue, ValueIfFalse)',
    },
    formulaExample: '=IF(B2>=75, "Lulus", "Remedial")',
    scenario: {
      id: 'Siswa dinyatakan Lulus jika nilai ujian (B2) minimal 75 (>= 75). Jika kurang dari itu, maka dinyatakan Remedial.',
      en: 'A student passes if exam score (B2) is at least 75 (>= 75). If lower, status is Remedial.',
    },
    taskInstruction: {
      id: 'Di sel C2, buat rumus IF untuk mengecek apakah B2 >= 75. Tampilkan "Lulus" jika benar dan "Remedial" jika salah.',
      en: 'In cell C2, create an IF formula testing if B2 >= 75. Return "Lulus" (or "Pass") if true, otherwise "Remedial".',
    },
    targetCell: 'C2',
    expectedResult: 'Lulus',
    expectedFormulaSample: '=IF(B2>=75, "Lulus", "Remedial")',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 4,
      cells: {
        A1: { value: 'Nama Siswa', format: 'text', isReadOnly: true },
        B1: { value: 'Nilai Akhir', format: 'text', isReadOnly: true },
        C1: { value: 'Status', format: 'text', isReadOnly: true },
        A2: { value: 'Rahmat Hidayat', format: 'text', isReadOnly: true },
        B2: { value: 82, format: 'number', isReadOnly: true },
        C2: { value: '', format: 'text' },
        A3: { value: 'Farhan Maulana', format: 'text', isReadOnly: true },
        B3: { value: 68, format: 'number', isReadOnly: true },
        C3: { value: 'Remedial', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Ketik =IF( lalu periksa kondisi B2>=75.',
          en: 'Start with =IF( and test condition B2>=75.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Beri tanda kutip untuk teks hasil: "Lulus" dan "Remedial". Pemisah bisa koma (,) atau titik koma (;).',
          en: 'Wrap output text in double quotes: "Lulus" and "Remedial". Separator can be comma or semicolon.',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =IF(B2>=75, "Lulus", "Remedial") pada sel C2.',
          en: 'Type =IF(B2>=75, "Lulus", "Remedial") into cell C2.',
        },
      },
    ],
  },
  {
    id: 'inter-2',
    level: 'intermediate',
    order: 2,
    category: {
      id: 'Kalkulasi Bersyarat',
      en: 'Conditional Calculations',
    },
    title: {
      id: 'Fungsi SUMIF: Menjumlahkan Penjualan Kategori Tertentu',
      en: 'SUMIF Function: Summing Sales by Specific Category',
    },
    concept: {
      id: 'Fungsi SUMIF menjumlahkan nilai sel yang memenuhi satu kriteria tertentu. Formatnya: SUMIF(RentangKriteria, Kriteria, RentangPenjumlahan).',
      en: 'SUMIF adds values that satisfy a single specific criterion. Syntax: SUMIF(CriteriaRange, Criterion, SumRange).',
    },
    syntax: {
      id: '=SUMIF(RentangKriteria, "Kriteria", RentangAngka)',
      en: '=SUMIF(CriteriaRange, "Criterion", SumRange)',
    },
    formulaExample: '=SUMIF(B2:B6, "Elektronik", C2:C6)',
    scenario: {
      id: 'Manager ingin mengetahui total penjualan khusus kategori "Elektronik" dari daftar transaksi toko retail.',
      en: 'Store manager wants total sales specifically for the "Elektronik" category from retail records.',
    },
    taskInstruction: {
      id: 'Di sel E2, hitung total penjualan kategori "Elektronik" menggunakan fungsi SUMIF dari tabel B2:C6.',
      en: 'In cell E2, calculate total sales for category "Elektronik" using SUMIF over table B2:C6.',
    },
    targetCell: 'E2',
    expectedResult: 6500000,
    expectedFormulaSample: '=SUMIF(B2:B6, "Elektronik", C2:C6)',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D', 'E'],
      rowCount: 8,
      cells: {
        A1: { value: 'Produk', format: 'text', isReadOnly: true },
        B1: { value: 'Kategori', format: 'text', isReadOnly: true },
        C1: { value: 'Total Penjualan', format: 'text', isReadOnly: true },
        D1: { value: 'Filter Kategori', format: 'text', isReadOnly: true },
        E1: { value: 'Hasil SUMIF', format: 'text', isReadOnly: true },
        A2: { value: 'Mouse Wireless', format: 'text', isReadOnly: true },
        B2: { value: 'Elektronik', format: 'text', isReadOnly: true },
        C2: { value: 1500000, format: 'currency', isReadOnly: true },
        D2: { value: 'Elektronik', format: 'text', isReadOnly: true },
        E2: { value: '', format: 'currency' },
        A3: { value: 'Kemeja Katun', format: 'text', isReadOnly: true },
        B3: { value: 'Pakaian', format: 'text', isReadOnly: true },
        C3: { value: 2000000, format: 'currency', isReadOnly: true },
        D3: { value: '', format: 'text', isReadOnly: true },
        E3: { value: '', format: 'text', isReadOnly: true },
        A4: { value: 'Keyboard Mech', format: 'text', isReadOnly: true },
        B4: { value: 'Elektronik', format: 'text', isReadOnly: true },
        C4: { value: 5000000, format: 'currency', isReadOnly: true },
        D4: { value: '', format: 'text', isReadOnly: true },
        E4: { value: '', format: 'text', isReadOnly: true },
        A5: { value: 'Celana Jeans', format: 'text', isReadOnly: true },
        B5: { value: 'Pakaian', format: 'text', isReadOnly: true },
        C5: { value: 3000000, format: 'currency', isReadOnly: true },
        D5: { value: '', format: 'text', isReadOnly: true },
        E5: { value: '', format: 'text', isReadOnly: true },
        A6: { value: 'Kipas Meja', format: 'text', isReadOnly: true },
        B6: { value: 'Perabot', format: 'text', isReadOnly: true },
        C6: { value: 800000, format: 'currency', isReadOnly: true },
        D6: { value: '', format: 'text', isReadOnly: true },
        E6: { value: '', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Rentang kategori ada di B2:B6, kriteria adalah "Elektronik", dan angka yang dijumlahkan ada di C2:C6.',
          en: 'Categories are in B2:B6, criterion is "Elektronik", and values to sum are in C2:C6.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur: =SUMIF(B2:B6, "Elektronik", C2:C6)',
          en: 'Pattern: =SUMIF(B2:B6, "Elektronik", C2:C6)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =SUMIF(B2:B6, "Elektronik", C2:C6) pada sel E2.',
          en: 'Type =SUMIF(B2:B6, "Elektronik", C2:C6) into cell E2.',
        },
      },
    ],
  },
  {
    id: 'inter-3',
    level: 'intermediate',
    order: 3,
    category: {
      id: 'Kalkulasi Bersyarat',
      en: 'Conditional Calculations',
    },
    title: {
      id: 'Fungsi COUNTIF: Menghitung Frekuensi Data Bersyarat',
      en: 'COUNTIF Function: Counting Occurrences with Criteria',
    },
    concept: {
      id: 'Fungsi COUNTIF menghitung jumlah sel yang memenuhi suatu kondisi spesifik. Sangat berguna untuk mengetahui jumlah transaksi berstatus selesai atau jumlah siswa yang lulus.',
      en: 'COUNTIF tallies cells meeting a condition. Indispensable for counting completed orders or passing grades.',
    },
    syntax: {
      id: '=COUNTIF(RentangSel, "Kriteria")',
      en: '=COUNTIF(CellRange, "Criterion")',
    },
    formulaExample: '=COUNTIF(C2:C7, "Selesai")',
    scenario: {
      id: 'Tim operasional gudang ingin mengetahui berapa pesanan yang berstatus "Selesai" dari daftar log pengiriman.',
      en: 'Warehouse team needs to count how many shipments hold the status "Selesai".',
    },
    taskInstruction: {
      id: 'Di sel C8, gunakan rumus COUNTIF untuk menghitung berapa kali kata "Selesai" muncul di rentang C2:C7.',
      en: 'In cell C8, use COUNTIF to count how many times "Selesai" appears in range C2:C7.',
    },
    targetCell: 'C8',
    expectedResult: 4,
    expectedFormulaSample: '=COUNTIF(C2:C7, "Selesai")',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 9,
      cells: {
        A1: { value: 'No Order', format: 'text', isReadOnly: true },
        B1: { value: 'Pelanggan', format: 'text', isReadOnly: true },
        C1: { value: 'Status Pengiriman', format: 'text', isReadOnly: true },
        A2: { value: 'ORD-101', format: 'text', isReadOnly: true },
        B2: { value: 'PT Maju Terus', format: 'text', isReadOnly: true },
        C2: { value: 'Selesai', format: 'text', isReadOnly: true },
        A3: { value: 'ORD-102', format: 'text', isReadOnly: true },
        B3: { value: 'CV Berkah', format: 'text', isReadOnly: true },
        C3: { value: 'Diproses', format: 'text', isReadOnly: true },
        A4: { value: 'ORD-103', format: 'text', isReadOnly: true },
        B4: { value: 'Toko Sumber', format: 'text', isReadOnly: true },
        C4: { value: 'Selesai', format: 'text', isReadOnly: true },
        A5: { value: 'ORD-104', format: 'text', isReadOnly: true },
        B5: { value: 'Firma Jaya', format: 'text', isReadOnly: true },
        C5: { value: 'Selesai', format: 'text', isReadOnly: true },
        A6: { value: 'ORD-105', format: 'text', isReadOnly: true },
        B6: { value: 'Koperasi Mandiri', format: 'text', isReadOnly: true },
        C6: { value: 'Batal', format: 'text', isReadOnly: true },
        A7: { value: 'ORD-106', format: 'text', isReadOnly: true },
        B7: { value: 'PT Sejahtera', format: 'text', isReadOnly: true },
        C7: { value: 'Selesai', format: 'text', isReadOnly: true },
        A8: { value: '', format: 'text', isReadOnly: true },
        B8: { value: 'Total Selesai', format: 'text', isReadOnly: true },
        C8: { value: '', format: 'number' },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Gunakan fungsi COUNTIF pada rentang status C2:C7.',
          en: 'Use COUNTIF on the status range C2:C7.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur rumus: =COUNTIF(C2:C7, "Selesai")',
          en: 'Formula pattern: =COUNTIF(C2:C7, "Selesai")',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =COUNTIF(C2:C7, "Selesai") pada sel C8.',
          en: 'Enter =COUNTIF(C2:C7, "Selesai") into cell C8.',
        },
      },
    ],
  },
  {
    id: 'inter-4',
    level: 'intermediate',
    order: 4,
    category: {
      id: 'Manipulasi Teks',
      en: 'Text Manipulation',
    },
    title: {
      id: 'Penggabungan Teks: Menggabungkan Nama Depan & Belakang',
      en: 'Text Concatenation: Combining First & Last Names',
    },
    concept: {
      id: 'Untuk menggabungkan teks dari dua sel atau lebih, Anda bisa menggunakan fungsi CONCAT atau operator dan (&). Jangan lupa menyisipkan spasi di antaranya dengan " ". Contoh: =A2&" "&B2.',
      en: 'To join text across cells, use CONCAT or the ampersand (&) operator. Include a space between words using " ". Example: =A2&" "&B2.',
    },
    syntax: {
      id: '=CONCAT(Teks1, " ", Teks2) atau =Teks1 & " " & Teks2',
      en: '=CONCAT(Text1, " ", Text2) or =Text1 & " " & Text2',
    },
    formulaExample: '=A2&" "&B2',
    scenario: {
      id: 'Bagian HRD memiliki tabel data karyawan dengan kolom Nama Depan (A2) dan Nama Belakang (B2) terpisah.',
      en: 'HR department has separated columns for First Name (A2) and Last Name (B2).',
    },
    taskInstruction: {
      id: 'Di sel C2, buat rumus untuk menggabungkan Nama Depan (A2) dan Nama Belakang (B2) dengan spasi di tengahnya.',
      en: 'In cell C2, create a formula combining First Name (A2) and Last Name (B2) separated by a space.',
    },
    targetCell: 'C2',
    expectedResult: 'Ahmad Fauzi',
    expectedFormulaSample: '=A2&" "&B2',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 4,
      cells: {
        A1: { value: 'Nama Depan', format: 'text', isReadOnly: true },
        B1: { value: 'Nama Belakang', format: 'text', isReadOnly: true },
        C1: { value: 'Nama Lengkap', format: 'text', isReadOnly: true },
        A2: { value: 'Ahmad', format: 'text', isReadOnly: true },
        B2: { value: 'Fauzi', format: 'text', isReadOnly: true },
        C2: { value: '', format: 'text' },
        A3: { value: 'Dian', format: 'text', isReadOnly: true },
        B3: { value: 'Pertiwi', format: 'text', isReadOnly: true },
        C3: { value: 'Dian Pertiwi', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Gabungkan sel A2, spasi " ", dan sel B2.',
          en: 'Join cell A2, space " ", and cell B2.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Bisa gunakan operator & seperti =A2&" "&B2 atau fungsi =CONCAT(A2, " ", B2).',
          en: 'You can use & like =A2&" "&B2 or =CONCAT(A2, " ", B2).',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =A2&" "&B2 pada sel C2.',
          en: 'Type =A2&" "&B2 into cell C2.',
        },
      },
    ],
  },
  {
    id: 'inter-5',
    level: 'intermediate',
    order: 5,
    category: {
      id: 'Ekstraksi Teks',
      en: 'Text Extraction',
    },
    title: {
      id: 'Fungsi LEFT & RIGHT: Mengambil Karakter Kode',
      en: 'LEFT & RIGHT Functions: Extracting Code Characters',
    },
    concept: {
      id: 'Fungsi LEFT mengambil sejumlah karakter pertama dari sisi kiri teks, sedangkan RIGHT mengambil dari sisi kanan. Formatnya: =LEFT(Teks, JumlahKarakter).',
      en: 'LEFT extracts a specified number of characters from the start of text, while RIGHT extracts from the end. Syntax: =LEFT(Text, NumChars).',
    },
    syntax: {
      id: '=LEFT(Teks, JumlahKarakter)',
      en: '=LEFT(Text, NumChars)',
    },
    formulaExample: '=LEFT(A2, 3)',
    scenario: {
      id: 'Kode inventaris gudang adalah "JKT-8821". Tiga huruf pertama ("JKT") menunjukkan kode kota gudang.',
      en: 'Inventory SKU is "JKT-8821". The initial 3 letters ("JKT") denote warehouse city code.',
    },
    taskInstruction: {
      id: 'Di sel B2, ambil 3 karakter pertama dari kode inventaris di sel A2 menggunakan fungsi LEFT.',
      en: 'In cell B2, extract the first 3 characters from SKU code in cell A2 using LEFT.',
    },
    targetCell: 'B2',
    expectedResult: 'JKT',
    expectedFormulaSample: '=LEFT(A2, 3)',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 4,
      cells: {
        A1: { value: 'Kode SKU', format: 'text', isReadOnly: true },
        B1: { value: 'Kode Kota (LEFT 3)', format: 'text', isReadOnly: true },
        C1: { value: 'Keterangan', format: 'text', isReadOnly: true },
        A2: { value: 'JKT-8821', format: 'text', isReadOnly: true },
        B2: { value: '', format: 'text' },
        C2: { value: 'Gudang Jakarta', format: 'text', isReadOnly: true },
        A3: { value: 'SBY-4412', format: 'text', isReadOnly: true },
        B3: { value: 'SBY', format: 'text', isReadOnly: true },
        C3: { value: 'Gudang Surabaya', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Gunakan fungsi LEFT dengan sel A2 dan angka 3.',
          en: 'Use LEFT with cell A2 and number 3.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Bentuk rumus: =LEFT(A2, 3)',
          en: 'Pattern: =LEFT(A2, 3)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =LEFT(A2, 3) pada sel B2.',
          en: 'Type =LEFT(A2, 3) into cell B2.',
        },
      },
    ],
  },
  {
    id: 'inter-6',
    level: 'intermediate',
    order: 6,
    category: {
      id: 'Logika & Aritmatika Bertingkat',
      en: 'Compound Logic & Arithmetic',
    },
    title: {
      id: 'Capstone Menengah: Rekap Gaji dengan Tunjangan Bersyarat',
      en: 'Intermediate Capstone: Payroll with Conditional Allowance',
    },
    concept: {
      id: 'Kombinasikan penjumlahan dengan fungsi IF: Karyawan berstatus "Tetap" mendapat tunjangan Rp 1.000.000, sedangkan karyawan "Kontrak" mendapat Rp 500.000. Total Gaji = Gaji Pokok + IF(Status="Tetap", 1000000, 500000).',
      en: 'Combine arithmetic with IF: "Tetap" employees receive a 1,000,000 allowance, while "Kontrak" gets 500,000. Total = Base + IF(Status="Tetap", 1000000, 500000).',
    },
    syntax: {
      id: '=GajiPokok + IF(Status="Tetap", 1000000, 500000)',
      en: '=BasePay + IF(Status="Tetap", 1000000, 500000)',
    },
    formulaExample: '=B2+IF(C2="Tetap", 1000000, 500000)',
    scenario: {
      id: 'Data karyawan di baris 2 memiliki Gaji Pokok Rp 6.000.000 (B2) dengan Status "Tetap" (C2).',
      en: 'Employee in row 2 has Base Pay 6,000,000 (B2) and Status "Tetap" (C2).',
    },
    taskInstruction: {
      id: 'Di sel D2, hitung Total Gaji dengan menjumlahkan Gaji Pokok (B2) ditambah tunjangan bersyarat IF status (C2) = "Tetap" maka 1000000, selain itu 500000.',
      en: 'In cell D2, calculate Total Pay by adding Base Pay (B2) to IF allowance: 1000000 if status (C2) is "Tetap", else 500000.',
    },
    targetCell: 'D2',
    expectedResult: 7000000,
    expectedFormulaSample: '=B2+IF(C2="Tetap", 1000000, 500000)',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D'],
      rowCount: 4,
      cells: {
        A1: { value: 'Nama Karyawan', format: 'text', isReadOnly: true },
        B1: { value: 'Gaji Pokok', format: 'text', isReadOnly: true },
        C1: { value: 'Status Kerja', format: 'text', isReadOnly: true },
        D1: { value: 'Total Gaji', format: 'text', isReadOnly: true },
        A2: { value: 'Bambang Sudiro', format: 'text', isReadOnly: true },
        B2: { value: 6000000, format: 'currency', isReadOnly: true },
        C2: { value: 'Tetap', format: 'text', isReadOnly: true },
        D2: { value: '', format: 'currency' },
        A3: { value: 'Anita Zahra', format: 'text', isReadOnly: true },
        B3: { value: 5000000, format: 'currency', isReadOnly: true },
        C3: { value: 'Kontrak', format: 'text', isReadOnly: true },
        D3: { value: 5500000, format: 'currency', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Mulai dengan =B2+IF(...)',
          en: 'Start with =B2+IF(...)',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur: =B2+IF(C2="Tetap", 1000000, 500000)',
          en: 'Pattern: =B2+IF(C2="Tetap", 1000000, 500000)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =B2+IF(C2="Tetap", 1000000, 500000) pada sel D2.',
          en: 'Type =B2+IF(C2="Tetap", 1000000, 500000) into cell D2.',
        },
      },
    ],
  },

  // ==========================================
  // LEVEL 3: LANJUTAN (ADVANCED)
  // ==========================================
  {
    id: 'adv-1',
    level: 'advanced',
    order: 1,
    category: {
      id: 'Pencarian & Referensi',
      en: 'Lookup & Reference',
    },
    title: {
      id: 'Fungsi VLOOKUP: Pencarian Data Vertikal Presisi',
      en: 'VLOOKUP Function: Exact Vertical Lookup',
    },
    concept: {
      id: 'VLOOKUP mencari nilai kunci di kolom paling kiri tabel referensi, lalu mengembalikan nilai dari nomor kolom yang Anda tentukan pada baris yang sama. Selalu sertakan FALSE (atau 0) di akhir untuk pencarian persis.',
      en: 'VLOOKUP searches for a key in the leftmost table column, then retrieves a value from the designated column index. Always use FALSE (or 0) for exact matches.',
    },
    syntax: {
      id: '=VLOOKUP(NilaiKunci, TabelReferensi, NomorKolom, FALSE)',
      en: '=VLOOKUP(LookupValue, TableArray, ColIndexNum, FALSE)',
    },
    formulaExample: '=VLOOKUP(E2, A2:C5, 3, FALSE)',
    scenario: {
      id: 'Kasir memasukkan kode barang "B-02" di sel E2. Sistem harus otomatis menampilkan Harga produk yang ada di kolom ke-3 dari tabel master A2:C5.',
      en: 'Cashier inputs item code "B-02" in cell E2. System must look up price located in column 3 of master table A2:C5.',
    },
    taskInstruction: {
      id: 'Di sel F2, tulis rumus VLOOKUP untuk mencari harga barang berdasarkan kode di E2 dari tabel referensi A2:C5 kolom ke-3 dengan pencarian persis FALSE.',
      en: 'In cell F2, write a VLOOKUP formula looking up E2 inside table A2:C5, returning column 3 with exact match FALSE.',
    },
    targetCell: 'F2',
    expectedResult: 35000,
    expectedFormulaSample: '=VLOOKUP(E2, A2:C5, 3, FALSE)',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D', 'E', 'F'],
      rowCount: 6,
      cells: {
        A1: { value: 'Kode', format: 'text', isReadOnly: true },
        B1: { value: 'Nama Barang', format: 'text', isReadOnly: true },
        C1: { value: 'Harga Satuan', format: 'text', isReadOnly: true },
        D1: { value: '', format: 'text', isReadOnly: true },
        E1: { value: 'Cari Kode', format: 'text', isReadOnly: true },
        F1: { value: 'Harga Ditemukan', format: 'text', isReadOnly: true },
        A2: { value: 'B-01', format: 'text', isReadOnly: true },
        B2: { value: 'Kertas A4', format: 'text', isReadOnly: true },
        C2: { value: 45000, format: 'currency', isReadOnly: true },
        D2: { value: '', format: 'text', isReadOnly: true },
        E2: { value: 'B-02', format: 'text', isReadOnly: true },
        F2: { value: '', format: 'currency' },
        A3: { value: 'B-02', format: 'text', isReadOnly: true },
        B3: { value: 'Tinta Hitam', format: 'text', isReadOnly: true },
        C3: { value: 35000, format: 'currency', isReadOnly: true },
        D3: { value: '', format: 'text', isReadOnly: true },
        E3: { value: '', format: 'text', isReadOnly: true },
        F3: { value: '', format: 'text', isReadOnly: true },
        A4: { value: 'B-03', format: 'text', isReadOnly: true },
        B4: { value: 'Stapler Besar', format: 'text', isReadOnly: true },
        C4: { value: 25000, format: 'currency', isReadOnly: true },
        D4: { value: '', format: 'text', isReadOnly: true },
        E4: { value: '', format: 'text', isReadOnly: true },
        F4: { value: '', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Argumen VLOOKUP: sel kunci (E2), rentang tabel (A2:C5), indeks kolom (3), dan kriteria persis (FALSE).',
          en: 'VLOOKUP args: lookup key (E2), table range (A2:C5), column index (3), and exact match (FALSE).',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur rumus: =VLOOKUP(E2, A2:C5, 3, FALSE)',
          en: 'Pattern: =VLOOKUP(E2, A2:C5, 3, FALSE)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =VLOOKUP(E2, A2:C5, 3, FALSE) pada sel F2.',
          en: 'Enter =VLOOKUP(E2, A2:C5, 3, FALSE) into cell F2.',
        },
      },
    ],
  },
  {
    id: 'adv-2',
    level: 'advanced',
    order: 2,
    category: {
      id: 'Pencarian Fleksibel',
      en: 'Flexible Lookups',
    },
    title: {
      id: 'Kombinasi INDEX dan MATCH: Pencarian Dua Arah Tanpa Batas Kolom',
      en: 'INDEX & MATCH: Flexible Lookups Without Column Restrictions',
    },
    concept: {
      id: 'VLOOKUP tidak dapat mencari data ke arah kiri. Kombinasi INDEX dan MATCH mengatasi kelemahan ini: MATCH menemukan nomor posisi baris, dan INDEX mengambil nilai dari kolom target manapun.',
      en: 'VLOOKUP cannot search backwards to the left. Combining INDEX and MATCH overcomes this: MATCH finds the row index, while INDEX retrieves the target cell.',
    },
    syntax: {
      id: '=INDEX(KolomTarget, MATCH(Kunci, KolomPencarian, 0))',
      en: '=INDEX(TargetCol, MATCH(LookupValue, LookupCol, 0))',
    },
    formulaExample: '=INDEX(A2:A4, MATCH(D2, B2:B4, 0))',
    scenario: {
      id: 'Kita memiliki Nama Karyawan di sel D2 ("Cindy"). Kita ingin mencari NIP Karyawan yang letaknya berada di sebelah kiri nama (kolom A).',
      en: 'We have employee name in D2 ("Cindy"). We need to retrieve employee ID located to the left in Column A.',
    },
    taskInstruction: {
      id: 'Di sel E2, gunakan kombinasi INDEX dan MATCH untuk mencari NIP di A2:A4 berdasarkan Nama di D2 yang dicocokkan pada B2:B4.',
      en: 'In cell E2, combine INDEX and MATCH to find Employee ID in A2:A4 for name in D2 matched against B2:B4.',
    },
    targetCell: 'E2',
    expectedResult: 'NIP-103',
    expectedFormulaSample: '=INDEX(A2:A4, MATCH(D2, B2:B4, 0))',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D', 'E'],
      rowCount: 5,
      cells: {
        A1: { value: 'NIP (Target)', format: 'text', isReadOnly: true },
        B1: { value: 'Nama Karyawan', format: 'text', isReadOnly: true },
        C1: { value: '', format: 'text', isReadOnly: true },
        D1: { value: 'Cari Nama', format: 'text', isReadOnly: true },
        E1: { value: 'NIP Ditemukan', format: 'text', isReadOnly: true },
        A2: { value: 'NIP-101', format: 'text', isReadOnly: true },
        B2: { value: 'Agus', format: 'text', isReadOnly: true },
        C2: { value: '', format: 'text', isReadOnly: true },
        D2: { value: 'Cindy', format: 'text', isReadOnly: true },
        E2: { value: '', format: 'text' },
        A3: { value: 'NIP-102', format: 'text', isReadOnly: true },
        B3: { value: 'Berta', format: 'text', isReadOnly: true },
        C3: { value: '', format: 'text', isReadOnly: true },
        D3: { value: '', format: 'text', isReadOnly: true },
        E3: { value: '', format: 'text', isReadOnly: true },
        A4: { value: 'NIP-103', format: 'text', isReadOnly: true },
        B4: { value: 'Cindy', format: 'text', isReadOnly: true },
        C4: { value: '', format: 'text', isReadOnly: true },
        D4: { value: '', format: 'text', isReadOnly: true },
        E4: { value: '', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'INDEX mengambil dari rentang NIP A2:A4, sedangkan MATCH mencari D2 di dalam rentang B2:B4.',
          en: 'INDEX draws from ID range A2:A4, while MATCH locates D2 inside B2:B4.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur: =INDEX(A2:A4, MATCH(D2, B2:B4, 0))',
          en: 'Pattern: =INDEX(A2:A4, MATCH(D2, B2:B4, 0))',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =INDEX(A2:A4, MATCH(D2, B2:B4, 0)) pada sel E2.',
          en: 'Type =INDEX(A2:A4, MATCH(D2, B2:B4, 0)) into cell E2.',
        },
      },
    ],
  },
  {
    id: 'adv-3',
    level: 'advanced',
    order: 3,
    category: {
      id: 'Pencarian Modern',
      en: 'Modern Lookups',
    },
    title: {
      id: 'Fungsi XLOOKUP: Pengganti Modern VLOOKUP',
      en: 'XLOOKUP Function: Modern Successor to VLOOKUP',
    },
    concept: {
      id: 'XLOOKUP adalah fungsi pencarian paling mutakhir di Excel modern. XLOOKUP dapat mencari ke segala arah tanpa perlu menghitung indeks kolom, dan memiliki penanganan nilai default bawaan jika data tidak ditemukan.',
      en: 'XLOOKUP is the modern lookup formula. It searches in any direction without column indices and handles missing values natively.',
    },
    syntax: {
      id: '=XLOOKUP(Kunci, KolomKunci, KolomHasil, "JikaTidakAda")',
      en: '=XLOOKUP(LookupVal, LookupArray, ReturnArray, "IfNotFound")',
    },
    formulaExample: '=XLOOKUP(D2, A2:A4, B2:B4, "Tidak Ada")',
    scenario: {
      id: 'Pengguna memasukkan kode produk di sel D2 ("P-03"). Temukan nama produk pada kolom B2:B4 dengan XLOOKUP.',
      en: 'User enters product code in cell D2 ("P-03"). Retrieve product name from column B2:B4 using XLOOKUP.',
    },
    taskInstruction: {
      id: 'Di sel E2, gunakan fungsi XLOOKUP untuk mencari D2 pada kolom A2:A4 dan mengembalikan data dari B2:B4.',
      en: 'In cell E2, use XLOOKUP to match D2 in A2:A4 and return corresponding entry from B2:B4.',
    },
    targetCell: 'E2',
    expectedResult: 'Monitor 24 Inch',
    expectedFormulaSample: '=XLOOKUP(D2, A2:A4, B2:B4)',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D', 'E'],
      rowCount: 5,
      cells: {
        A1: { value: 'Kode', format: 'text', isReadOnly: true },
        B1: { value: 'Nama Barang', format: 'text', isReadOnly: true },
        C1: { value: '', format: 'text', isReadOnly: true },
        D1: { value: 'Cari Kode', format: 'text', isReadOnly: true },
        E1: { value: 'Hasil XLOOKUP', format: 'text', isReadOnly: true },
        A2: { value: 'P-01', format: 'text', isReadOnly: true },
        B2: { value: 'Webcam HD', format: 'text', isReadOnly: true },
        C2: { value: '', format: 'text', isReadOnly: true },
        D2: { value: 'P-03', format: 'text', isReadOnly: true },
        E2: { value: '', format: 'text' },
        A3: { value: 'P-02', format: 'text', isReadOnly: true },
        B3: { value: 'Headset USB', format: 'text', isReadOnly: true },
        C3: { value: '', format: 'text', isReadOnly: true },
        D3: { value: '', format: 'text', isReadOnly: true },
        E3: { value: '', format: 'text', isReadOnly: true },
        A4: { value: 'P-03', format: 'text', isReadOnly: true },
        B4: { value: 'Monitor 24 Inch', format: 'text', isReadOnly: true },
        C4: { value: '', format: 'text', isReadOnly: true },
        D4: { value: '', format: 'text', isReadOnly: true },
        E4: { value: '', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Tiga argumen utama: sel kunci (D2), rentang pencarian (A2:A4), dan rentang hasil (B2:B4).',
          en: 'Three core args: lookup key (D2), lookup array (A2:A4), and return array (B2:B4).',
        },
      },
      {
        level: 2,
        text: {
          id: 'Bentuk rumus: =XLOOKUP(D2, A2:A4, B2:B4)',
          en: 'Pattern: =XLOOKUP(D2, A2:A4, B2:B4)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =XLOOKUP(D2, A2:A4, B2:B4) pada sel E2.',
          en: 'Type =XLOOKUP(D2, A2:A4, B2:B4) into cell E2.',
        },
      },
    ],
  },
  {
    id: 'adv-4',
    level: 'advanced',
    order: 4,
    category: {
      id: 'Penanganan Error',
      en: 'Error Handling',
    },
    title: {
      id: 'Fungsi IFERROR: Mengamankan Tampilan dari Kode Error',
      en: 'IFERROR Function: Sanitizing Calculations from Error Codes',
    },
    concept: {
      id: 'Terkadang rumus menghasilkan error seperti #DIV/0! atau #N/A. IFERROR menangkap error tersebut dan menggantinya dengan teks atau angka pengganti yang rapi (misal 0 atau tanda strip "-").',
      en: 'Formulas can output error codes like #DIV/0! or #N/A. IFERROR catches these and substitutes a graceful fallback (such as 0 or "-").',
    },
    syntax: {
      id: '=IFERROR(RumusAsli, NilaiPengganti)',
      en: '=IFERROR(FormulaValue, ValueIfError)',
    },
    formulaExample: '=IFERROR(A2/B2, 0)',
    scenario: {
      id: 'Terdapat pembagian target penjualan (A2 = 500) dengan realisasi (B2 = 0). Pembagian dengan nol akan menghasilkan #DIV/0!. Bungkus dengan IFERROR agar menampilkan 0.',
      en: 'Dividing target (A2 = 500) by zero actuals (B2 = 0) yields #DIV/0!. Wrap calculation with IFERROR to display 0 instead.',
    },
    taskInstruction: {
      id: 'Di sel C2, tulis rumus pembagian A2/B2 yang dibungkus dengan fungsi IFERROR sehingga jika terjadi error, hasilnya adalah angka 0.',
      en: 'In cell C2, wrap division A2/B2 in an IFERROR function returning 0 if an error occurs.',
    },
    targetCell: 'C2',
    expectedResult: 0,
    expectedFormulaSample: '=IFERROR(A2/B2, 0)',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 4,
      cells: {
        A1: { value: 'Target', format: 'text', isReadOnly: true },
        B1: { value: 'Realisasi', format: 'text', isReadOnly: true },
        C1: { value: 'Rasio Efisiensi', format: 'text', isReadOnly: true },
        A2: { value: 500, format: 'number', isReadOnly: true },
        B2: { value: 0, format: 'number', isReadOnly: true },
        C2: { value: '', format: 'number' },
        A3: { value: 600, format: 'number', isReadOnly: true },
        B3: { value: 300, format: 'number', isReadOnly: true },
        C3: { value: 2, format: 'number', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Bungkus pembagian A2/B2 di dalam fungsi IFERROR.',
          en: 'Wrap division A2/B2 inside IFERROR function.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Bentuk rumus: =IFERROR(A2/B2, 0)',
          en: 'Pattern: =IFERROR(A2/B2, 0)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =IFERROR(A2/B2, 0) pada sel C2.',
          en: 'Type =IFERROR(A2/B2, 0) into cell C2.',
        },
      },
    ],
  },
  {
    id: 'adv-5',
    level: 'advanced',
    order: 5,
    category: {
      id: 'Array Dinamis',
      en: 'Dynamic Arrays',
    },
    title: {
      id: 'Fungsi UNIQUE: Mengekstrak Daftar Unik Tanpa Duplikat',
      en: 'UNIQUE Function: Extracting Distinct Values Without Duplicates',
    },
    concept: {
      id: 'Fungsi array dinamis UNIQUE menyaring daftar data dan secara otomatis menghilangkan seluruh duplikat yang berulang, menghasilkan daftar nilai unik.',
      en: 'The dynamic array UNIQUE formula scans a column and automatically discards repeated entries, spilling a distinct list.',
    },
    syntax: {
      id: '=UNIQUE(RentangData)',
      en: '=UNIQUE(Array)',
    },
    formulaExample: '=UNIQUE(A2:A6)',
    scenario: {
      id: 'Kolom A memuat daftar kota cabang yang memiliki banyak duplikasi ("Bandung", "Jakarta", "Bandung", "Surabaya", "Jakarta").',
      en: 'Column A lists branch locations containing duplicates ("Bandung", "Jakarta", "Bandung", "Surabaya", "Jakarta").',
    },
    taskInstruction: {
      id: 'Di sel C2, gunakan fungsi UNIQUE untuk mengekstrak daftar kota unik dari rentang A2:A6.',
      en: 'In cell C2, enter UNIQUE function to extract distinct cities from range A2:A6.',
    },
    targetCell: 'C2',
    expectedResult: ['Bandung', 'Jakarta', 'Surabaya'],
    expectedFormulaSample: '=UNIQUE(A2:A6)',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 7,
      cells: {
        A1: { value: 'Kota Cabang (Data)', format: 'text', isReadOnly: true },
        B1: { value: '', format: 'text', isReadOnly: true },
        C1: { value: 'Daftar Kota Unik', format: 'text', isReadOnly: true },
        A2: { value: 'Bandung', format: 'text', isReadOnly: true },
        B2: { value: '', format: 'text', isReadOnly: true },
        C2: { value: '', format: 'text' },
        A3: { value: 'Jakarta', format: 'text', isReadOnly: true },
        B3: { value: '', format: 'text', isReadOnly: true },
        C3: { value: '', format: 'text', isReadOnly: true },
        A4: { value: 'Bandung', format: 'text', isReadOnly: true },
        B4: { value: '', format: 'text', isReadOnly: true },
        C4: { value: '', format: 'text', isReadOnly: true },
        A5: { value: 'Surabaya', format: 'text', isReadOnly: true },
        B5: { value: '', format: 'text', isReadOnly: true },
        C5: { value: '', format: 'text', isReadOnly: true },
        A6: { value: 'Jakarta', format: 'text', isReadOnly: true },
        B6: { value: '', format: 'text', isReadOnly: true },
        C6: { value: '', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Cukup masukkan rentang A2:A6 ke dalam fungsi UNIQUE.',
          en: 'Simply pass range A2:A6 into UNIQUE function.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur rumus: =UNIQUE(A2:A6)',
          en: 'Pattern: =UNIQUE(A2:A6)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =UNIQUE(A2:A6) pada sel C2.',
          en: 'Type =UNIQUE(A2:A6) into cell C2.',
        },
      },
    ],
  },
  {
    id: 'adv-6',
    level: 'advanced',
    order: 6,
    category: {
      id: 'Pencarian & Kalkulasi Komprehensif',
      en: 'Comprehensive Lookup & Calculation',
    },
    title: {
      id: 'Capstone Lanjutan: Pembuatan Invoice Otomatis dengan VLOOKUP',
      en: 'Advanced Capstone: Automated Invoice Line Item with VLOOKUP',
    },
    concept: {
      id: 'Pada sistem kasir atau invoice, subtotal dihitung dari Jumlah (Qty) dikalikan dengan Harga Satuan yang dicari secara otomatis menggunakan VLOOKUP dari tabel daftar harga barang.',
      en: 'In invoicing systems, subtotal equals Qty multiplied by Unit Price looked up via VLOOKUP from a master product price list.',
    },
    syntax: {
      id: '=Qty * VLOOKUP(Kode, TabelKatalog, IndeksHarga, FALSE)',
      en: '=Qty * VLOOKUP(Code, CatalogTable, PriceColIndex, FALSE)',
    },
    formulaExample: '=B2*VLOOKUP(A2, E2:G4, 3, FALSE)',
    scenario: {
      id: 'Pembeli memesan 4 unit barang dengan kode di sel A2 ("KB-01"). Tabel master harga ada di E2:G4 dengan kolom harga di posisi ke-3.',
      en: 'Customer orders 4 units of item in A2 ("KB-01"). Master price table is in E2:G4 with unit price at column 3.',
    },
    taskInstruction: {
      id: 'Di sel C2, hitung Total Belanja dengan mengalikan Qty (B2) dengan hasil pencarian VLOOKUP kode A2 pada tabel master E2:G4 kolom 3 (FALSE).',
      en: 'In cell C2, calculate Total Bill by multiplying Qty (B2) by VLOOKUP of code A2 against catalog E2:G4 column 3 (FALSE).',
    },
    targetCell: 'C2',
    expectedResult: 1000000,
    expectedFormulaSample: '=B2*VLOOKUP(A2, E2:G4, 3, FALSE)',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
      rowCount: 5,
      cells: {
        A1: { value: 'Kode Pesan', format: 'text', isReadOnly: true },
        B1: { value: 'Qty', format: 'text', isReadOnly: true },
        C1: { value: 'Total Bayar', format: 'text', isReadOnly: true },
        D1: { value: '', format: 'text', isReadOnly: true },
        E1: { value: 'Katalog Kode', format: 'text', isReadOnly: true },
        F1: { value: 'Nama Produk', format: 'text', isReadOnly: true },
        G1: { value: 'Harga Katalog', format: 'text', isReadOnly: true },
        A2: { value: 'KB-01', format: 'text', isReadOnly: true },
        B2: { value: 4, format: 'number', isReadOnly: true },
        C2: { value: '', format: 'currency' },
        D2: { value: '', format: 'text', isReadOnly: true },
        E2: { value: 'KB-01', format: 'text', isReadOnly: true },
        F2: { value: 'Keyboard RGB', format: 'text', isReadOnly: true },
        G2: { value: 250000, format: 'currency', isReadOnly: true },
        A3: { value: '', format: 'text', isReadOnly: true },
        B3: { value: '', format: 'text', isReadOnly: true },
        C3: { value: '', format: 'text', isReadOnly: true },
        D3: { value: '', format: 'text', isReadOnly: true },
        E3: { value: 'KB-02', format: 'text', isReadOnly: true },
        F3: { value: 'Mouse Ergonomis', format: 'text', isReadOnly: true },
        G3: { value: 150000, format: 'currency', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Kalikan sel B2 dengan rumus VLOOKUP(A2, E2:G4, 3, FALSE).',
          en: 'Multiply cell B2 by VLOOKUP(A2, E2:G4, 3, FALSE).',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur: =B2*VLOOKUP(A2, E2:G4, 3, FALSE)',
          en: 'Pattern: =B2*VLOOKUP(A2, E2:G4, 3, FALSE)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =B2*VLOOKUP(A2, E2:G4, 3, FALSE) pada sel C2.',
          en: 'Enter =B2*VLOOKUP(A2, E2:G4, 3, FALSE) into cell C2.',
        },
      },
    ],
  },

  // ==========================================
  // LEVEL 4: MAHIR (PRO)
  // ==========================================
  {
    id: 'pro-1',
    level: 'pro',
    order: 1,
    category: {
      id: 'Pemodelan Finansial',
      en: 'Financial Modeling',
    },
    title: {
      id: 'Fungsi PMT: Menghitung Angsuran Kredit Bunga Tetap Bulanan',
      en: 'PMT Function: Calculating Fixed Monthly Loan Repayments',
    },
    concept: {
      id: 'Fungsi PMT menghitung besaran cicilan pinjaman bulanan dengan suku bunga dan jangka waktu tetap. Perhatikan bahwa suku bunga tahunan harus dibagi 12 untuk cicilan bulanan: =PMT(SukuBungaTahun/12, TenorBulan, -PokokPinjaman).',
      en: 'The PMT function computes monthly loan amortization with fixed rates and duration. Annual rate must be divided by 12: =PMT(AnnualRate/12, Months, -Principal).',
    },
    syntax: {
      id: '=PMT(SukuBungaBulanan, JumlahBulan, -NilaiPinjaman)',
      en: '=PMT(MonthlyRate, TotalMonths, -LoanAmount)',
    },
    formulaExample: '=PMT(B1/12, B2, -B3)',
    scenario: {
      id: 'Nasabah mengajukan pinjaman bank Rp 120.000.000 (sel B3) dengan bunga tahunan 12% (sel B1 = 0.12) dan jangka waktu tenor 24 bulan (sel B2 = 24).',
      en: 'Client applies for a 120,000,000 bank loan (cell B3) at 12% annual interest (cell B1 = 0.12) over 24 months (cell B2 = 24).',
    },
    taskInstruction: {
      id: 'Di sel B4, hitung cicilan per bulan dengan rumus PMT menggunakan bunga bulanan B1/12, jumlah bulan B2, dan pinjaman negatif -B3.',
      en: 'In cell B4, calculate monthly payment using PMT with monthly rate B1/12, periods B2, and negative principal -B3.',
    },
    targetCell: 'B4',
    expectedResult: 5648816.63,
    validate: (_formula, calculatedValue) => {
      // Tolerate rounding within reasonable margin
      const num = Math.abs(Number(calculatedValue));
      const valid = Math.abs(num - 5648816.63) < 100 || Math.abs(num - 5648817) < 10;
      return {
        valid,
        feedbackId: valid ? undefined : 'Hasil angsuran PMT diharapkan sekitar Rp 5.648.817 per bulan.',
        feedbackEn: valid ? undefined : 'Expected PMT output is approximately 5,648,817 per month.',
      };
    },
    expectedFormulaSample: '=PMT(B1/12, B2, -B3)',
    initialGrid: {
      columns: ['A', 'B'],
      rowCount: 6,
      cells: {
        A1: { value: 'Bunga Tahunan', format: 'text', isReadOnly: true },
        B1: { value: 0.12, format: 'percent', isReadOnly: true },
        A2: { value: 'Tenor (Bulan)', format: 'text', isReadOnly: true },
        B2: { value: 24, format: 'number', isReadOnly: true },
        A3: { value: 'Pokok Pinjaman', format: 'text', isReadOnly: true },
        B3: { value: 120000000, format: 'currency', isReadOnly: true },
        A4: { value: 'Cicilan Per Bulan', format: 'text', isReadOnly: true },
        B4: { value: '', format: 'currency' },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Bunga tahunan di B1 harus dibagi 12 (B1/12) agar menjadi suku bunga bulanan.',
          en: 'Divide annual rate B1 by 12 (B1/12) to match monthly periods.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Bentuk rumus: =PMT(B1/12, B2, -B3)',
          en: 'Pattern: =PMT(B1/12, B2, -B3)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =PMT(B1/12, B2, -B3) pada sel B4.',
          en: 'Type =PMT(B1/12, B2, -B3) into cell B4.',
        },
      },
    ],
  },
  {
    id: 'pro-2',
    level: 'pro',
    order: 2,
    category: {
      id: 'Pencarian Matriks Dua Arah',
      en: 'Two-Way Matrix Lookups',
    },
    title: {
      id: 'Two-Way Lookup: Pencarian Baris & Kolom Simultan',
      en: 'Two-Way Lookup: Simultaneous Row & Column Lookup',
    },
    concept: {
      id: 'Untuk mencari perpotongan antara baris tertentu dan kolom tertentu pada tabel matriks, gunakan INDEX dengan dua fungsi MATCH: satu MATCH untuk menentukan nomor baris, dan satu MATCH untuk menentukan nomor kolom.',
      en: 'To look up the intersection of a specific row and column in a matrix table, pair INDEX with dual MATCH functions: one for row index and one for column index.',
    },
    syntax: {
      id: '=INDEX(TabelIsi, MATCH(KunciBaris, KolomHeader, 0), MATCH(KunciKolom, BarisHeader, 0))',
      en: '=INDEX(DataMatrix, MATCH(RowKey, RowHeaders, 0), MATCH(ColKey, ColHeaders, 0))',
    },
    formulaExample: '=INDEX(B2:D4, MATCH(F2, A2:A4, 0), MATCH(G2, B1:D1, 0))',
    scenario: {
      id: 'Tabel tarif logistik mencakup Kota Tujuan di kolom A dan Bobot Paket di baris header (1kg, 5kg, 10kg). Cari tarif untuk tujuan "Medan" (F2) dengan bobot "5kg" (G2).',
      en: 'Logistics tariff matrix lists destination cities in column A and parcel weights in header (1kg, 5kg, 10kg). Find rate for "Medan" (F2) at weight "5kg" (G2).',
    },
    taskInstruction: {
      id: 'Di sel H2, tulis rumus INDEX matriks B2:D4 dengan MATCH baris untuk F2 di A2:A4 dan MATCH kolom untuk G2 di B1:D1.',
      en: 'In cell H2, write INDEX for matrix B2:D4 with row MATCH for F2 in A2:A4 and column MATCH for G2 in B1:D1.',
    },
    targetCell: 'H2',
    expectedResult: 85000,
    expectedFormulaSample: '=INDEX(B2:D4, MATCH(F2, A2:A4, 0), MATCH(G2, B1:D1, 0))',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      rowCount: 6,
      cells: {
        A1: { value: 'Kota Tujuan', format: 'text', isReadOnly: true },
        B1: { value: '1kg', format: 'text', isReadOnly: true },
        C1: { value: '5kg', format: 'text', isReadOnly: true },
        D1: { value: '10kg', format: 'text', isReadOnly: true },
        E1: { value: '', format: 'text', isReadOnly: true },
        F1: { value: 'Kota', format: 'text', isReadOnly: true },
        G1: { value: 'Bobot', format: 'text', isReadOnly: true },
        H1: { value: 'Tarif Ongkir', format: 'text', isReadOnly: true },
        A2: { value: 'Surabaya', format: 'text', isReadOnly: true },
        B2: { value: 15000, format: 'currency', isReadOnly: true },
        C2: { value: 45000, format: 'currency', isReadOnly: true },
        D2: { value: 80000, format: 'currency', isReadOnly: true },
        E2: { value: '', format: 'text', isReadOnly: true },
        F2: { value: 'Medan', format: 'text', isReadOnly: true },
        G2: { value: '5kg', format: 'text', isReadOnly: true },
        H2: { value: '', format: 'currency' },
        A3: { value: 'Medan', format: 'text', isReadOnly: true },
        B3: { value: 25000, format: 'currency', isReadOnly: true },
        C3: { value: 85000, format: 'currency', isReadOnly: true },
        D3: { value: 150000, format: 'currency', isReadOnly: true },
        E3: { value: '', format: 'text', isReadOnly: true },
        F3: { value: '', format: 'text', isReadOnly: true },
        G3: { value: '', format: 'text', isReadOnly: true },
        H3: { value: '', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Matriks nilai ongkir berada di B2:D4.',
          en: 'Shipping rate matrix spans B2:D4.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur: =INDEX(B2:D4, MATCH(F2, A2:A4, 0), MATCH(G2, B1:D1, 0))',
          en: 'Pattern: =INDEX(B2:D4, MATCH(F2, A2:A4, 0), MATCH(G2, B1:D1, 0))',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =INDEX(B2:D4, MATCH(F2, A2:A4, 0), MATCH(G2, B1:D1, 0)) pada sel H2.',
          en: 'Type =INDEX(B2:D4, MATCH(F2, A2:A4, 0), MATCH(G2, B1:D1, 0)) into cell H2.',
        },
      },
    ],
  },
  {
    id: 'pro-3',
    level: 'pro',
    order: 3,
    category: {
      id: 'Komisi Bertingkat',
      en: 'Tiered Commissions',
    },
    title: {
      id: 'Simulasi Komisi Sales Progresif Bertingkat (Nested IF)',
      en: 'Progressive Tiered Sales Commission (Nested IF)',
    },
    concept: {
      id: 'Sistem komisi bisnis seringkali memiliki ambang batas berjenjang: jika penjualan (B2) di atas 50 juta, komisi 10% (0.1*B2). Jika penjualan di atas 20 juta, komisi 5% (0.05*B2). Jika di bawah itu, komisi 0.',
      en: 'Business commissions often feature tiers: if sales (B2) > 50M, earn 10% (0.1*B2). If sales > 20M, earn 5% (0.05*B2). Otherwise 0.',
    },
    syntax: {
      id: '=IF(B2>50000000, B2*0.1, IF(B2>20000000, B2*0.05, 0))',
      en: '=IF(B2>50000000, B2*0.1, IF(B2>20000000, B2*0.05, 0))',
    },
    formulaExample: '=IF(B2>50000000, B2*0.1, IF(B2>20000000, B2*0.05, 0))',
    scenario: {
      id: 'Salesman mencapai nilai omset penjualan Rp 60.000.000 di sel B2. Karena melebihi 50 juta, ia berhak mendapatkan komisi 10%.',
      en: 'Salesperson achieved 60,000,000 in revenue at cell B2. Exceeding 50M qualifies them for 10% commission.',
    },
    taskInstruction: {
      id: 'Di sel C2, susun rumus nested IF untuk menghitung bonus komisi: jika B2 > 50000000 maka B2*0.1, jika B2 > 20000000 maka B2*0.05, selain itu 0.',
      en: 'In cell C2, construct a nested IF: if B2 > 50000000 then B2*0.1, if B2 > 20000000 then B2*0.05, else 0.',
    },
    targetCell: 'C2',
    expectedResult: 6000000,
    expectedFormulaSample: '=IF(B2>50000000, B2*0.1, IF(B2>20000000, B2*0.05, 0))',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 4,
      cells: {
        A1: { value: 'Nama Sales', format: 'text', isReadOnly: true },
        B1: { value: 'Realisasi Penjualan', format: 'text', isReadOnly: true },
        C1: { value: 'Bonus Komisi', format: 'text', isReadOnly: true },
        A2: { value: 'Indra Gunawan', format: 'text', isReadOnly: true },
        B2: { value: 60000000, format: 'currency', isReadOnly: true },
        C2: { value: '', format: 'currency' },
        A3: { value: 'Maya Safitri', format: 'text', isReadOnly: true },
        B3: { value: 30000000, format: 'currency', isReadOnly: true },
        C3: { value: 1500000, format: 'currency', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Gunakan IF bertumpuk untuk menguji kondisi 50 juta terlebih dahulu.',
          en: 'Use nested IF testing the 50 million tier first.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur: =IF(B2>50000000, B2*0.1, IF(B2>20000000, B2*0.05, 0))',
          en: 'Pattern: =IF(B2>50000000, B2*0.1, IF(B2>20000000, B2*0.05, 0))',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =IF(B2>50000000, B2*0.1, IF(B2>20000000, B2*0.05, 0)) pada sel C2.',
          en: 'Type =IF(B2>50000000, B2*0.1, IF(B2>20000000, B2*0.05, 0)) into cell C2.',
        },
      },
    ],
  },
  {
    id: 'pro-4',
    level: 'pro',
    order: 4,
    category: {
      id: 'Kalkulasi Tanggal Kerja',
      en: 'Work Date Calculations',
    },
    title: {
      id: 'Kalkulasi Tanggal: Menghitung Selisih Tahun & Usia Kerja',
      en: 'Date Calculation: Computing Year Difference & Work Tenure',
    },
    concept: {
      id: 'Fungsi YEAR mengekstrak angka tahun dari suatu tanggal. Dengan mengurangkan tahun saat ini YEAR(TODAY()) dengan tahun masuk kerja YEAR(B2), kita memperoleh total lama masa pengabdian kerja karyawan dalam tahun.',
      en: 'The YEAR function extracts the 4-digit calendar year. Subtracting hire year YEAR(B2) from current year YEAR(TODAY()) yields employee work tenure in years.',
    },
    syntax: {
      id: '=YEAR(TODAY()) - YEAR(SelTanggal)',
      en: '=YEAR(TODAY()) - YEAR(DateCell)',
    },
    formulaExample: '=YEAR(TODAY())-YEAR(B2)',
    scenario: {
      id: 'Karyawan mulai bergabung di perusahaan pada tanggal "2020-01-15" (sel B2). Hitung masa kerja karyawan hingga tahun berjalan.',
      en: 'Employee joined the organization on "2020-01-15" (cell B2). Calculate completed years of service up to current year.',
    },
    taskInstruction: {
      id: 'Di sel C2, kurangkan tahun saat ini menggunakan YEAR(TODAY()) dengan tahun masuk kerja YEAR(B2).',
      en: 'In cell C2, subtract start year YEAR(B2) from current year YEAR(TODAY()).',
    },
    targetCell: 'C2',
    expectedResult: 6,
    validate: (_formula, calculatedValue) => {
      const currentYear = new Date().getFullYear();
      const expected = currentYear - 2020;
      return {
        valid: Number(calculatedValue) === expected || Number(calculatedValue) === 6,
        feedbackId: 'Hasil pengurangan tahun diharapkan sesuai masa kerja karyawan.',
        feedbackEn: 'Expected difference between current year and 2020.',
      };
    },
    expectedFormulaSample: '=YEAR(TODAY())-YEAR(B2)',
    initialGrid: {
      columns: ['A', 'B', 'C'],
      rowCount: 4,
      cells: {
        A1: { value: 'Nama Karyawan', format: 'text', isReadOnly: true },
        B1: { value: 'Tanggal Masuk', format: 'text', isReadOnly: true },
        C1: { value: 'Masa Kerja (Tahun)', format: 'text', isReadOnly: true },
        A2: { value: 'Rudi Hartono', format: 'text', isReadOnly: true },
        B2: { value: '2020-01-15', format: 'date', isReadOnly: true },
        C2: { value: '', format: 'number' },
        A3: { value: 'Lilis Suryani', format: 'text', isReadOnly: true },
        B3: { value: '2022-06-10', format: 'date', isReadOnly: true },
        C3: { value: 4, format: 'number', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Gunakan fungsi YEAR untuk TODAY() dan YEAR untuk sel B2.',
          en: 'Use YEAR for TODAY() and YEAR for cell B2.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur rumus: =YEAR(TODAY())-YEAR(B2)',
          en: 'Pattern: =YEAR(TODAY())-YEAR(B2)',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =YEAR(TODAY())-YEAR(B2) pada sel C2.',
          en: 'Type =YEAR(TODAY())-YEAR(B2) into cell C2.',
        },
      },
    ],
  },
  {
    id: 'pro-5',
    level: 'pro',
    order: 5,
    category: {
      id: 'Kalkulasi Multi Kriteria',
      en: 'Multi-Condition Aggregation',
    },
    title: {
      id: 'Fungsi SUMIFS: Penjumlahan Multi Kriteria Wilayah & Kategori',
      en: 'SUMIFS Function: Multi-Condition Regional & Category Summing',
    },
    concept: {
      id: 'Berbeda dengan SUMIF tunggal, SUMIFS menempatkan rentang angka yang dijumlahkan di posisi paling pertama: =SUMIFS(RentangJumlah, RentangKriteria1, Kriteria1, RentangKriteria2, Kriteria2).',
      en: 'Unlike single SUMIF, SUMIFS places the sum range at the very front: =SUMIFS(SumRange, CriteriaRange1, Criteria1, CriteriaRange2, Criteria2).',
    },
    syntax: {
      id: '=SUMIFS(RentangAngka, RentangKriteria1, "Kriteria1", RentangKriteria2, "Kriteria2")',
      en: '=SUMIFS(SumRange, CriteriaRange1, "Crit1", CriteriaRange2, "Crit2")',
    },
    formulaExample: '=SUMIFS(C2:C5, A2:A5, "Surabaya", B2:B5, "Elektronik")',
    scenario: {
      id: 'Manajemen ingin mengetahui total omset di kota "Surabaya" khusus untuk kategori "Elektronik" dari tabel data transaksi A2:C5.',
      en: 'Management needs total revenue in city "Surabaya" restricted to category "Elektronik" from dataset A2:C5.',
    },
    taskInstruction: {
      id: 'Di sel E2, tulis rumus SUMIFS untuk menjumlahkan nilai C2:C5 dengan kriteria kota di A2:A5 = "Surabaya" dan kategori di B2:B5 = "Elektronik".',
      en: 'In cell E2, write a SUMIFS formula summing C2:C5 where city in A2:A5 is "Surabaya" and category in B2:B5 is "Elektronik".',
    },
    targetCell: 'E2',
    expectedResult: 12000000,
    expectedFormulaSample: '=SUMIFS(C2:C5, A2:A5, "Surabaya", B2:B5, "Elektronik")',
    initialGrid: {
      columns: ['A', 'B', 'C', 'D', 'E'],
      rowCount: 6,
      cells: {
        A1: { value: 'Kota', format: 'text', isReadOnly: true },
        B1: { value: 'Kategori', format: 'text', isReadOnly: true },
        C1: { value: 'Penjualan', format: 'text', isReadOnly: true },
        D1: { value: 'Kriteria Filter', format: 'text', isReadOnly: true },
        E1: { value: 'Hasil SUMIFS', format: 'text', isReadOnly: true },
        A2: { value: 'Surabaya', format: 'text', isReadOnly: true },
        B2: { value: 'Elektronik', format: 'text', isReadOnly: true },
        C2: { value: 7000000, format: 'currency', isReadOnly: true },
        D2: { value: 'Surabaya + Elektronik', format: 'text', isReadOnly: true },
        E2: { value: '', format: 'currency' },
        A3: { value: 'Surabaya', format: 'text', isReadOnly: true },
        B3: { value: 'Pakaian', format: 'text', isReadOnly: true },
        C3: { value: 3000000, format: 'currency', isReadOnly: true },
        D3: { value: '', format: 'text', isReadOnly: true },
        E3: { value: '', format: 'text', isReadOnly: true },
        A4: { value: 'Jakarta', format: 'text', isReadOnly: true },
        B4: { value: 'Elektronik', format: 'text', isReadOnly: true },
        C4: { value: 9000000, format: 'currency', isReadOnly: true },
        D4: { value: '', format: 'text', isReadOnly: true },
        E4: { value: '', format: 'text', isReadOnly: true },
        A5: { value: 'Surabaya', format: 'text', isReadOnly: true },
        B5: { value: 'Elektronik', format: 'text', isReadOnly: true },
        C5: { value: 5000000, format: 'currency', isReadOnly: true },
        D5: { value: '', format: 'text', isReadOnly: true },
        E5: { value: '', format: 'text', isReadOnly: true },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Pada SUMIFS, rentang penjumlahan C2:C5 ditulis pertama kali.',
          en: 'In SUMIFS, the sum range C2:C5 is written first.',
        },
      },
      {
        level: 2,
        text: {
          id: 'Struktur: =SUMIFS(C2:C5, A2:A5, "Surabaya", B2:B5, "Elektronik")',
          en: 'Pattern: =SUMIFS(C2:C5, A2:A5, "Surabaya", B2:B5, "Elektronik")',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =SUMIFS(C2:C5, A2:A5, "Surabaya", B2:B5, "Elektronik") pada sel E2.',
          en: 'Enter =SUMIFS(C2:C5, A2:A5, "Surabaya", B2:B5, "Elektronik") into cell E2.',
        },
      },
    ],
  },
  {
    id: 'pro-6',
    level: 'pro',
    order: 6,
    category: {
      id: 'Pemodelan Dashboard Eksekutif',
      en: 'Executive Dashboard Modeling',
    },
    title: {
      id: 'Tantangan Final Master: Model Ringkasan Profit Bersih Laporan Keuangan',
      en: 'Master Capstone: Net Corporate Profit Executive Scorecard',
    },
    concept: {
      id: 'Model scorecard eksekutif merangkum Laba Bersih Setelah Pajak (EAT) dari Total Omset (B2) dikurangi Total Beban Pokok & Operasional (B3), lalu dikurangi Pajak Perusahaan 22% (B4). Rumus: =(B2-B3)*(1-B4).',
      en: 'Executive scorecard computes Net Profit After Tax by taking Total Revenue (B2), subtracting Operating Costs (B3), and applying corporate tax rate (B4). Formula: =(B2-B3)*(1-B4).',
    },
    syntax: {
      id: '=(Pendapatan - Biaya) * (1 - TarifPajak)',
      en: '=(Revenue - Expenses) * (1 - TaxRate)',
    },
    formulaExample: '=(B2-B3)*(1-B4)',
    scenario: {
      id: 'Data laporan keuangan kuartalan: Pendapatan Kotor (B2) Rp 250.000.000, Beban Biaya (B3) Rp 150.000.000, dan Tarif Pajak Badan (B4) 22% (0.22).',
      en: 'Quarterly financial summary: Gross Revenue (B2) 250,000,000, Total Costs (B3) 150,000,000, Corporate Tax Rate (B4) 22% (0.22).',
    },
    taskInstruction: {
      id: 'Di sel B5, hitung Laba Bersih Setelah Pajak dengan rumus =(B2-B3)*(1-B4).',
      en: 'In cell B5, calculate Net Profit After Tax using formula =(B2-B3)*(1-B4).',
    },
    targetCell: 'B5',
    expectedResult: 78000000,
    expectedFormulaSample: '=(B2-B3)*(1-B4)',
    initialGrid: {
      columns: ['A', 'B'],
      rowCount: 7,
      cells: {
        A1: { value: 'Item Laporan Finansial', format: 'text', isReadOnly: true },
        B1: { value: 'Nilai Rupiah', format: 'text', isReadOnly: true },
        A2: { value: 'Total Pendapatan Kotor', format: 'text', isReadOnly: true },
        B2: { value: 250000000, format: 'currency', isReadOnly: true },
        A3: { value: 'Beban Operasional', format: 'text', isReadOnly: true },
        B3: { value: 150000000, format: 'currency', isReadOnly: true },
        A4: { value: 'Tarif Pajak Perusahaan', format: 'text', isReadOnly: true },
        B4: { value: 0.22, format: 'percent', isReadOnly: true },
        A5: { value: 'Laba Bersih Akhir (EAT)', format: 'text', isReadOnly: true },
        B5: { value: '', format: 'currency' },
      },
    },
    hints: [
      {
        level: 1,
        text: {
          id: 'Kurangkan B2 dengan B3 terlebih dahulu di dalam kurung: (B2-B3).',
          en: 'Subtract B3 from B2 inside parentheses first: (B2-B3).',
        },
      },
      {
        level: 2,
        text: {
          id: 'Lalu kalikan dengan sisa setelah pajak: *(1-B4).',
          en: 'Then multiply by after-tax remainder: *(1-B4).',
        },
      },
      {
        level: 3,
        text: {
          id: 'Ketik =(B2-B3)*(1-B4) pada sel B5.',
          en: 'Type =(B2-B3)*(1-B4) into cell B5.',
        },
      },
    ],
  },
];

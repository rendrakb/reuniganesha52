# reuniganesha52.github.io
# Laman untuk Reuni 10 Tahun Ganesha 52. 

Work in progress

## Ide-ide

### A. Diagram Rencana Finansial 

Untuk Rencana Finansial, selain menggunakan tabel konvensional, juga akan ditampilkan dalam diagram Sankey menggunakan d3.js agar memudahkan pembaca. 

#### Alur 

1. Buat data .xls rencana finansial konvensional untuk 4 skenario jumlah pendaftar.
2. Restruktur input & output.
3. Ekspor menjadi .csv untuk masing-masing skenario.
4. Proses menggunakan d3.js.
5. Tampilkan di .html menggunakan slide untuk masing masing skenario, beserta tabel konvensional rencana finansial.

### B. Embed Google Forms 

Sistem pendaftaran pada acara menggunakan Google Forms yang di-embed pada laman, untuk mengurangi kompleksitas manajemen data & menjamin keamanan privasi. Pada Google Forms pendaftaran juga dimasukkan input untuk berbagai survei terkait acara untuk meningkatkan partisipasi aspirasi pendaftar. Pendaftaran pada Google Forms memerlukan Google Login agar tidak menimbulkan pendaftaran ganda.

Penggunaan Google Forms juga memungkinkan pada bagian Kritik, Saran & Pertanyaan.

### C. Otomasi Tampilan Data Pendaftar 

Data pendaftar akan ditampilkan secara langsung di laman melalui proses otomasi agar memudahkan calon pendaftar & pendaftar untuk mengecek siapa saja yang sudah mendaftar. Data yang ditampilkan bukan merupakan data sensitif. Proses otomasi data scraping yang diperoleh dari Google Forms didesain sehingga tidak memerlukan Google API (menggunakan skrip untuk membaca langsung data Google Sheets).

#### Alur 

1. Buat Google Appscript di Google Sheets hasil dari Google Forms untuk meng-ekspor data terbaru di sebuah .csv di Google Drive. 
2. Jadwalkan skrip sehingga berjalan setiap kali trigger terjadi, yang mana setiap kali ada pembaruan data. 
3. Fetch data .csv menggunakan JavaScript dan tampilkan pada laman sebagai tabel.


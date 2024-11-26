# Laman untuk Reuni 10 Tahun Ganesha 52. 

Work in progress

## Ide-ide

### A. Diagram Rencana Finansial - Done

Untuk Rencana Finansial, selain menggunakan tabel konvensional, juga akan ditampilkan dalam diagram menggunakan d3.js agar memudahkan pembacaan. 

#### Alur 

1. Buat data .xls rencana finansial konvensional untuk masing masing skenario jumlah pendaftar.
2. Ekspor menjadi .csv dan konversi ke .json.
3. Proses menggunakan d3.js.
4. Tampilkan di .html menggunakan slide untuk masing masing skenario, beserta tabel konvensional rencana finansial yang membaca sumber data yang sama.

### B. Embed Google Forms - Ongoing

Sistem pendaftaran pada acara menggunakan Google Forms yang di-embed pada laman, untuk mengurangi kompleksitas manajemen data & menjamin keamanan privasi. Pada Google Forms pendaftaran juga dimasukkan input untuk berbagai survei terkait acara untuk meningkatkan partisipasi aspirasi pendaftar. Pendaftaran pada Google Forms memerlukan Google Login agar tidak menimbulkan pendaftaran ganda.

Penggunaan Google Forms juga memungkinkan pada bagian Kritik, Saran & Pertanyaan.

#### Potensi Masalah

Ternyata Google form tidak memperbolehkan embed form yang memiliki fitur upload file di dalamnya, jadi kemungkinan harus membuat secara manual dengan bantuan serverless computing Google Apps Script sebagai pengganti server. Dengan demikian, privasi & keamanan data tetap terjamin

##### Alur

1. Siapkan Google Sheet dan Folder di Google Drive:
    - Buat Google Sheet untuk data.
    - Buat folder di Google Drive untuk file.
2. Membuat Formulir dengan HTML dan JavaScript:
    - Buat formulir HTML untuk input nama dan file.
    - Gunakan JavaScript untuk mengirim data ke Google Apps Script.
3. Google Apps Script sebagai penerima data:
    - Buat skrip untuk menerima data dari form & deploy sebagai Google Web App.
    - Skrip akan menyimpan data teks ke Google Sheet dan file ke folder Google Drive.

### C. Embed Sheet Data Pendaftar - Ongoing

Data pendaftar akan ditampilkan secara langsung di laman melalui embed html dari Google Sheet agar memudahkan calon pendaftar & pendaftar untuk mengecek siapa saja yang sudah mendaftar. Data yang ditampilkan bukan merupakan data sensitif. 
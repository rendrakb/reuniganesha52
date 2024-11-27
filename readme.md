# Laman untuk Reuni 10 Tahun Ganesha 52. 

Work in progress. Laman ini dibuat sebagai platform pembantu acara Reuni 10 Tahun Ganesha 52 sekaligus untuk kesempatan belajar web-developing. Laman ini didesain sedemikian sehingga tidak memerlukan biaya sepeserpun untuk bekerja, baik secara statis maupun dinamis.

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

#### Potensi Masalah 1

Ternyata Google form tidak memperbolehkan embed form yang memiliki fitur upload file di dalamnya, jadi kemungkinan harus membuat secara manual dengan bantuan serverless computing Google Apps Script sebagai pengganti server. Dengan demikian, privasi & keamanan data tetap terjamin

##### Alur

1. Siapkan Google Sheet dan Folder di Google Drive:
    - Buat Google Sheet untuk data.
    - Buat folder di Google Drive untuk file.
2. Membuat Formulir di index.html:
    - Buat formulir di .html untuk input data form dan file.
    - Gunakan tombol submit sebagai action call menuju Google Web App.
3. Google Apps Script sebagai penerima data:
    - Buat skrip untuk menerima data dari form & deploy sebagai Google Web App.
    - Skrip akan menyimpan data teks ke Google Sheet dan file ke folder Google Drive.

#### Potensi Masalah 2

Google web app script perlu verifikasi agar tidak ada prompt unverified app (serem secara privasi & keamanan bagi pengguna, source code yang berjalan di web app ga bisa dishare secara langsung), menimbang profil pengguna & pengelola yg gamau ribet jadi mending google form aja, tanpa perlu di embed. Nanti ketika sudah selesai akan di-merge kembali. 


### C. Embed Sheet Data Pendaftar - Ongoing

Data pendaftar akan ditampilkan secara langsung di laman melalui embed html dari Google Sheet agar memudahkan calon pendaftar & pendaftar untuk mengecek siapa saja yang sudah mendaftar. Data yang ditampilkan bukan merupakan data sensitif. 
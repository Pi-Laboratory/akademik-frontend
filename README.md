# Memulai dengan standard collaboration project

Project ini di mulai dari Template [Create React App](https://github.com/facebook/create-react-app).
## Tool

Di usahakan dengan hanya menggunakan beberapa komponen yang di tetapkan untuk membentuk sinkornisasi dengan pengembang yang lainnya.\

Komponen yang di gunakan yaitu:\
[BlueprintJS](https://blueprintjs.com/docs/) untuk elemen-elemen dasar komponen UI.\
[Styled System](https://styled-system.com/) untuk kemudahan memanipulasi tampilan dengan nilai-nilai yang telah di tetapkan.\
[Formik](https://formik.org/docs/overview) untuk memanajemen input formulir.

## Directory Structure

    .
    ├── build               # Compiled files
    ├── public              # Static public files
    ├── src                 # Source files
    │   ├── components        # Komponen reuseable project
    │   │   ├── Grid.js       # File komponen
    │   │   ├── utility.js    # File utility
    │   │   └── index.js
    │   ├── pages             # Halaman
    │   │   ├── Admin         # Folder halaman
    │   │   │   ├── hoc.js    # Context file
    │   │   │   ├── Layout.js
    │   │   │   ├── Router.js
    │   │   │   └── index.js
    │   │   ├── Admin.Users   # Folder route bertingkat
    │   │   │   └── index.js
    │   │   └── Login         # Folder halaman
    │   │       ├── Form.js   # Komponen untuk halaman tersebut
    │   │       └── index.js
    │   ├── 404.js
    │   ├── Layout.js
    │   ├── Router.js
    │   └── index.js
    ├── LICENSE
    └── README.md

## Available Scripts

Anda bisa menjalankan _script_ berikut:

```bash
$ npm start     # Menjalankan aplikasi dalam mode pengembang.
$ npm run test  # Mengeksekusi test fungsional dalam mode pantauan perubahan.
$ npm run build # Membangun aplikasi untuk produksi ke dalam folder build.

## Note: ini operasi satu aray. Begitu anda `eject`, anda tidak dapat kembali !
$ npm run eject # Perintah ini akan menghapus dependensi build tunggal dari proyek Anda.
```

### Deployment

Bagian ini dipindahkan ke halaman berikut: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` gagal me-minify

Bagian ini dipindahkan ke halaman berikut: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

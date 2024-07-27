# Menggunakan image Node.js versi alpine sebagai dasar
FROM node:20.11.1-alpine3.19

# Menentukan direktori kerja di dalam kontainer
WORKDIR /app

# Menyalin package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Menginstal dependensi aplikasi
RUN npm install

# Menyalin seluruh kode sumber aplikasi ke direktori kerja
COPY . .

# Lakukan build untuk aplikasi NestJS
RUN npm run build

# Tambahkan perintah untuk menjalankan aplikasi
CMD ["npm", "run", "start:prod"]
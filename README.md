# Dokumentasi untuk tugas magang / internship backend developer Dot Indonesia

## Deskripsi singkat

Ini adalah tugas sederhana untuk menggambarkan kemampuan coding saya untuk melamar kerja magang di dot indonesia, saya menggunakan studi kasus untuk membuat api bank sederhana yang dapat melakukan transaksi pengiriman uang dari antar akun.

## Tech Stack

- Programming language: Typescript
- Framework: Nestjs
- Database: Postgresql and Mongodb
- Object Relational Mapping (ORM): Sequelize and Mongoose
- Message Broker: Rabbitmq
- Gateway: Nginx
- Containerization: Docker & Docker Compose

## Entity Relationship Diagram

![Entity Relationship Diagram](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-07-28%20at%2010.19.40.png?updatedAt=1722136796273)

## Struktur Api : layered Architectur

![layered Architectur](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-07-28%20at%2009.56.14.png?updatedAt=1722136235860)

## Struktur Proyek Keseluruhan : Microservices

![Microservices](https://ik.imagekit.io/sarrahmanme/Screenshot%202024-07-28%20at%2010.09.25.png?updatedAt=1722136235105)

## Instalasi dan cara penggunaan

Docker adalah cara termudah dan teraman untuk menjalankan RESTFUL Api ini tanpa masalah konfigurasi apa pun. Jika Anda belum memiliki Docker, Anda dapat mengunduhnya dari situs resmi Docker.

1. Klon repositori ini dari GitHub

   ```bash
   git clone https://github.com/sarrahman-me/dot-indonesia-task-magang.git
   ```

2. Buka terminal dan navigasikan ke direktori yang berisi file docker-compose.yml

   ```bash
   cd /dot-indonesia-task-magang/docker
   ```

3. Jalankan semua aplikasi dan database menggunakan docker

   ```bash
   docker compose up
   ```

4. Pastikan semuanya berjalan dengan mencoba mengakses gateway api

   ```bash
   http://localhost
   ```

## API Documentation

Aplikasi ini memiliki 2 service, users service dan transaction service

[users-service](https://github.com/sarrahman-me/dot-indonesia-task-magang/tree/main/users-service)

[transaction-service](https://github.com/sarrahman-me/dot-indonesia-task-magang/tree/main/transaction-service)

Saya juga menyiapkan dokumentasi postman untuk semua endpoint dari semua service [disini](https://documenter.getpostman.com/view/29090922/2sA3JM71wm#fddfb529-e12c-43e9-9f91-41266a768dc9)
